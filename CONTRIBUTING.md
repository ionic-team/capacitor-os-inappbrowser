# Contributing

This guide provides instructions for contributing to this Capacitor plugin.

## Native code

This repository contains minimal code for native Android and iOS. The implementation for native mobile exists in separate repositories:

- [Contributing for Android](https://github.com/OutSystems/OSInAppBrowserLib-Android)
- [For iOS](https://github.com/OutSystems/OSInAppBrowserLib-iOS)

## Developing

### Local Setup

1. Fork and clone the repo.
1. Install the dependencies.

    ```shell
    npm install
    ```

1. Install SwiftLint if you're on macOS.

    ```shell
    brew install swiftlint
    ```

### Scripts

#### `npm run build`

Build the plugin web assets and generate plugin API documentation using [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen).

It will compile the TypeScript code from `src/` into ESM JavaScript in `dist/esm/`. These files are used in apps with bundlers when your plugin is imported.

Then, Rollup will bundle the code into a single file at `dist/plugin.js`. This file is used in apps without bundlers by including it as a script in `index.html`.

#### `npm run verify`

Build and validate the web and native projects.

This is useful to run in CI to verify that the plugin builds for all platforms.

#### `npm run lint` / `npm run fmt`

Check formatting and code quality, autoformat/autofix if possible.

This template is integrated with ESLint, Prettier, and SwiftLint. Using these tools is completely optional, but the [Capacitor Community](https://github.com/capacitor-community/) strives to have consistent code style and structure for easier cooperation.

## Commits/PR's

Commits and PR's should use the [conventional-commits](https://www.conventionalcommits.org/) format so the release process can version and create changelog correctly.

## Publishing

Publishing is automated based on the branch committed to. When a commit or merge is made to a branch a release that corresponds with the branch will be created (main requires manual trigger):

| Branch Name | Build Type                    | NPM Tag | Example NPM Version                |
| ----------- | ----------------------------- | ------- | ---------------------------------- |
| development | dev                           | dev     | @capacitor/inappbrowser@1.0.0-dev.1  |
| next        | next (these are betas/alphas) | next    | @capacitor/inappbrowser@1.0.0-next.1 |
| main        | latest                        | latest  | @capacitor/inappbrowser@1.0.0        |

- In general new developments will go straight to `main`. If we want to have non-stable versions (e.g. for new Capacitor versions or when there are many changes), we may use `next` or `development` branch, and then once they are ready for stable version, open a PR to main (should be rebased to keep history).

> **Note**: The [`files`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files) array in `package.json` specifies which files get published. If you rename files/directories or add files elsewhere, you may need to update it.
