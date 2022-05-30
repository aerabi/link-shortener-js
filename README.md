# Link Shortener

## Build From Scratch

### Create Nest.js Project
To install Nest.js CLI globally using NPM:

```bash
npm install -g @nestjs/cli
```

Create a directory named `backend` and get into it:

```bash
mkdir -p backend
cd backend
```

Now, create a Nest.js project there:

```bash
nest new link-shortener
```

Then, when asked to pick a package manager, pick `npm` just by pressing enter.

A git repo is created under `link-shortener` with everything included in it.
As we are already inside a git repo, let's remove the `.git` directory in the Nest.js
project and commit the whole project instead.

```bash
cd link-shortener
rm -rf .git
git add .
git commit -m "Create Nest.js project"
```
