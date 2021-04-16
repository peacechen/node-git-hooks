const fs = require("fs");
const path = require("path");

function installGitHooks(args) {
  const libPath = path.dirname(require.main.filename);
  const regexPath = /^(.*?)node_modules/.exec(libPath);
  const appRoot = regexPath ? regexPath[1] : libPath;
  const package = require(`${appRoot}package.json`);
  let repoPath = "./";

  if (package["node-git-hooks"] && package["node-git-hooks"]["repo-path"]) {
    repoPath = package["node-git-hooks"]["repo-path"];
  }

  if (!fs.existsSync(`${repoPath}.git`) || !fs.existsSync(`${repoPath}.git/hooks`)) {
    console.log("The installation isn't a Git repo. Skipping hooks installation.");
    return 0;
  }

  if (!fs.existsSync("./.githooks")) {
    console.log("No .githooks folder found. Skipping hooks installation.");
    return 0;
  }

  console.log("Installing Git hooks...");
  try {
    copyDir("./.githooks", `${repoPath}.git/hooks`);
  } catch (error) {
    console.error("Error copying Git hooks: ", error);
    return 1;
  }
  return 0;
}

function copyDir(src, dest) {
  const files = fs.readdirSync(src);
  for (let file of files) {
    const current = fs.lstatSync(path.join(src, file));
    if (current.isDirectory()) {
      copyDir(path.join(src, file), path.join(dest, file));
    } else if (current.isSymbolicLink()) {
      const symlink = fs.readlinkSync(path.join(src, file));
      fs.symlinkSync(symlink, path.join(dest, file));
    } else {
      copy(path.join(src, file), path.join(dest, file));
    }
  }
};

function copy(src, dest) {
  fs.copyFileSync(src, dest);
};

module.exports = installGitHooks;
