# Cross-Platform Installation of Git Hooks

Git hooks are a powerful tool to help developers maintain consistency in their code.
Unfortunately hooks are not part of the repository and thus require developers to
manually set up and/or install them.  There are a number of projects that address
this, but they are not as automated, deployment-friendly, or cross-platform.

## Node JS for Cross-Platform Support

Instead of using shell scripts which are dependent on the OS, this project uses
Node to abstract filesystem operations.  This allows it to run on Linux, OSX,
Windows, any OS supported by Node.

## Deployment Friendly

While automated installation of Git hooks is great for developers, it can cause
problems during deployment.  If an npm package post-installs
hooks inside node_modules, build systems may throw the error
`Appears to be a git repo or submodule`.  This project will only copy hooks
if the `.git` folder exists.

## Tutorial

[This article on dev.to](https://dev.to/peacechen/automated-cross-platform-git-hooks-with-npm-1iof) has a detailed explanation and setup walk-through.

## Installation

> npm install node-git-hooks --save-dev

## Usage

Create a `.githooks` folder and place hooks inside named corresponding to what they should be in `.git/hooks`.  For example, the script `pre-commit`
runs before a commit and is often used to perform linting. Remember to set the executable flag for hook files on \*NIX systems:
> chmod +x .githooks/*

Add the following `postinstall` script to package.json:
```
"scripts": {
  "postinstall": "node-git-hooks"
},
```

Run `npm install` to initialize the hooks.

## Advanced Usage

If `package.json` is not located at the root of the repo (e.g. a multi-project repo), add the key
`node-git-hooks` with the `repo-path` as such:
```
{
  "node-git-hooks": {
    "repo-path": "../"
  }
}
```
