const path = require("path");
const { lstatSync, readdirSync } = require("fs");
// get listing of packages in the mono repo
const basePath = path.resolve(__dirname, "packages");
const packages = readdirSync(basePath).filter((name) => {
  return lstatSync(path.join(basePath, name)).isDirectory();
});

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["lib"],
  moduleNameMapper: {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@midnight/${name}(.*)$`]: `<rootDir>/packages/./${name}/src/$1`,
      }),
      {}
    ),
  },
};
