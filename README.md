# The Art of Controlled Surrender

A private, password-protected interactive essay, ready for GitHub Pages.

## What is in this folder

| File | What it is | Commit it? |
|---|---|---|
| `index.html` | The password page with the essay encrypted inside it | Yes |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are | Yes |
| `tools/lock.mjs` | Script that re-encrypts the essay with a new password | Yes |
| `source/essay.html` | The readable essay | **No** |
| `source/HANDOFF.md` | Design ethos, decisions, evidence status and code map. Start here to continue the work. | **No** |
| `source/build-prompt-v2.md`, `source/original-prompt.md` | The specification and the first prompt | **No** |
| `.gitignore` | Keeps `source/` out of the repository | Yes |

## How the password works

The essay is encrypted with AES-256-GCM. The key is derived from the password in the visitor's browser (PBKDF2, 600,000 rounds). Without the password, the repository and the live page contain only ciphertext.

Three limits to know:

- **It is as strong as the password.** Use a long one.
- **Anyone you give the password to can save or forward the essay.**
- **Never commit `source/essay.html`.** If the readable file is in a public repository, the password protects nothing. If you upload through the GitHub website, leave the `source` folder out, because `.gitignore` only applies to the git command line.

## Publish on GitHub Pages

1. Create a new repository on GitHub.
2. Add `index.html`, `.nojekyll`, `.gitignore`, `README.md` and the `tools` folder. Do not add `source`.
3. In the repository, open Settings, then Pages. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

With git on the command line:

```
git init
git add .
git commit -m "Controlled Surrender"
git branch -M main
git remote add origin https://github.com/<your-username>/<repository-name>.git
git push -u origin main
```

## Change the password or update the essay

Needs Node 18 or later. No packages to install.

```
node tools/lock.mjs
```

It asks for a new password, reads `source/essay.html` and rewrites `index.html`. Commit and push the new `index.html`.

To update the essay, replace `source/essay.html` and run the same command.

## Testing locally

The password page needs a secure connection, so opening `index.html` by double-clicking may not unlock in every browser. Test on the live Pages URL, or run `npx serve` in this folder and open the address it prints.
