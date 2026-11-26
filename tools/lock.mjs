#!/usr/bin/env node
// Encrypts source/essay.html into index.html behind a password page.
// Usage:  node tools/lock.mjs            (asks for the password)
//         LOCK_PASSWORD=... node tools/lock.mjs
// No dependencies. Needs Node 18 or later.
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ITER = 600000;
let pw = process.env.LOCK_PASSWORD;
if (!pw) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  pw = (await rl.question('New password: ')).trim();
  rl.close();
}
if (!pw || pw.length < 8) { console.error('Use a password of at least 8 characters.'); process.exit(1); }

const html = readFileSync(join(root, 'source/essay.html'));
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, html));
const b64 = u => Buffer.from(u).toString('base64');

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>Controlled Surrender</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap">
<style>
:root{--bg:#F5F2EB;--ink:#141311;--stone:#6E6A63;--hair:rgba(20,19,17,.14);--bad:#B23A2E}
@media (prefers-color-scheme:dark){:root{--bg:#0D0E11;--ink:#F2EFE9;--stone:#918D86;--hair:rgba(242,239,233,.16);--bad:#F0604F;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;min-height:100dvh;display:grid;place-items:center;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif;padding:24px max(20px,env(safe-area-inset-right,0px)) 24px max(20px,env(safe-area-inset-left,0px))}
main{width:min(100%,30rem);display:grid;gap:22px}
.mono{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:11.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--stone)}
h1{font-family:"Instrument Serif","Iowan Old Style",serif;font-weight:400;font-size:clamp(2.8rem,9vw,4.4rem);line-height:.98;letter-spacing:-.025em;margin:0;text-wrap:balance}
h1 em{font-style:italic}
form{display:grid;gap:14px;border-top:1px solid var(--ink);padding-top:20px}
label{display:grid;gap:8px}
input{font-family:"Instrument Serif",serif;font-size:1.6rem;color:var(--ink);background:none;border:0;border-bottom:1px solid var(--ink);border-radius:0;padding:6px 0;width:100%}
input:focus-visible,button:focus-visible{outline:2px solid #2E5BFF;outline-offset:4px}
button{justify-self:start;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--bg);background:var(--ink);border:1px solid var(--ink);border-radius:999px;padding:11px 20px;cursor:pointer}
button[disabled]{opacity:.5;cursor:default}
#msg{min-height:1.4em;font-size:14px;color:var(--bad);margin:0}
</style>
</head>
<body>
<main>
  <p class="mono">Private preview</p>
  <h1>The Art of <em>Controlled</em> Surrender</h1>
  <form id="f">
    <label><span class="mono">Password</span><input id="pw" type="password" autocomplete="current-password" autofocus required></label>
    <button id="go">Enter</button>
    <p id="msg" role="alert"></p>
  </form>
</main>
<script>
(()=>{
const D={s:"${b64(salt)}",i:"${b64(iv)}",n:${ITER},c:"${b64(ct)}"};
const u=b=>Uint8Array.from(atob(b),c=>c.charCodeAt(0)),msg=document.getElementById('msg'),go=document.getElementById('go');
const show=buf=>{const h=new TextDecoder().decode(buf);document.open();document.write(h);document.close()};
const open=raw=>crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']).then(k=>crypto.subtle.decrypt({name:'AES-GCM',iv:u(D.i)},k,u(D.c)));
if(!(window.crypto&&crypto.subtle)){msg.textContent='This page needs a secure (https) connection to unlock.';go.disabled=true;return}
try{const k=sessionStorage.getItem('cs-key');if(k)open(u(k)).then(show,()=>sessionStorage.removeItem('cs-key'))}catch(e){}
document.getElementById('f').addEventListener('submit',async e=>{
  e.preventDefault();msg.textContent='';go.disabled=true;go.textContent='Opening';
  try{
    const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(document.getElementById('pw').value),'PBKDF2',false,['deriveBits']);
    const raw=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:u(D.s),iterations:D.n,hash:'SHA-256'},base,256));
    const buf=await open(raw);
    try{sessionStorage.setItem('cs-key',btoa(String.fromCharCode(...raw)))}catch(e){}
    show(buf);
  }catch(err){msg.textContent='That password did not open it.';go.disabled=false;go.textContent='Enter';document.getElementById('pw').select()}
});
})();
</script>
</body>
</html>
`;
writeFileSync(join(root, 'index.html'), page);
console.log('Wrote index.html (' + Math.round(page.length / 1024) + ' KB, encrypted).');
