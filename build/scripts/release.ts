import { resolve } from "path";
import chalk from "chalk";
import fs from "fs";

import semver from "semver";

import { execSync } from "child_process";

import inquirer from "inquirer";

import minimist from "minimist";

import imsuiPackage from "../../packages/ims-ui/package.json";

const log = console.log;
const packages = [
  "enums",
  "constants",
  "hooks",
  "types",
  "utils",
  "components",
  "ims-ui",
];
const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

/**
 * 获取指定包的根目录
 *
 * @param packageName  包名
 * @returns
 */
const getPackageRoot = (packageName: string) => {
  return pathResolve(`packages/${packageName}`);
};

const versionIncrements = ["patch", "minor", "major"];

// 版本增加
const incVersion = (i: any) => semver.inc(currentVersion, i);

const args = minimist(process.argv.slice(2));

const { version: currentVersion } = imsuiPackage;

// const args = require('minimist')(process.argv.slice(2));

function updateVersions(version: string) {
  // 1. update root package.json
  updatePackage(pathResolve("."), version);
  // 2. update all packages
  packages.forEach((p) => updatePackage(getPackageRoot(p), version));
}

function updatePackage(pkgRoot: any, version: string) {
  // const pkgPath = path.resolve(pkgRoot, 'package.json');

  const pkgPath = pathResolve(pkgRoot) + "/package.json";

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

async function publishPackage(pkgName: string, version: string) {
  const pkgRoot = getPackageRoot(pkgName);
  // const pkgPath = path.resolve(pkgRoot, 'package.json');

  const pkgPath = pkgRoot + "/package.json";
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  if (pkg.private) {
    return;
  }

  // console.log(pkgRoot, 'pkgRootpkgRoot');
  log(chalk.green(`Publishing ${pkgName}...`));

  try {
    // npm publish --registry http://localhost:4873/
    execSync(
      "pnpm publish --registry http://localhost:4873/ --no-git-checks --access public",
      {
        cwd: pkgRoot,
        stdio: "inherit",
      }
    );

    log(chalk.green(`Successfully published ${pkgName}@${version}`));
  } catch (e: any) {
    if (e.stderr.match(/previously published/)) {
      log(chalk.green(`Skipping already published: ${pkgName}`));
    } else {
      throw e;
    }
  }
}

(async function main() {
  // 需要发布的版本号
  let targetVersion = args._[0];

  console.info("targetVersion =>", targetVersion);

  // 如果没有传入版本，提示选择
  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await inquirer.prompt({
      type: "list",
      name: "release",
      message: "Select release type 选择发行的类型",
      choices: versionIncrements
        .map((i) => `${i} (${incVersion(i)})`)
        .concat(["custom"]),
    });

    console.info("release =>", release);

    if (release === "custom") {
      // 选择自定义 需要提示再进行输入
      const { version } = await inquirer.prompt({
        type: "input",
        name: "version",
        message: "Please Input Custom Version eg 1.2.1",
      });
      targetVersion = version;
    } else {
      targetVersion = release.match(/\((.*)\)/)[1];
    }

    console.info("targetVersion =>", targetVersion);
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { confirm } = await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!confirm) return;

  // update all package versions and inter-dependencies
  log(chalk.bgBlue("Updating cross dependencies..."));

  updateVersions(targetVersion);

  log(chalk.bgBlue("Publishing packages..."));

  for (const pkg of packages) {
    await publishPackage(pkg, targetVersion);
  }
})();
