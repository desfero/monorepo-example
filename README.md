## Example app

Contains two packages (`core` and `app`).

`yarn install` - will install all dependencies for each project and link dependent project between each other
`yarn test` - will run all tests for each package and service (console.log inside `test.js`)
`yarn test:packages` - run all tests for each package (console.log inside `test.js`)

## Directory Structure

Put each package under the `packages` directory.

## Tools:

* yarn: NPM client.
* Lerna: Multiple packages management tool.

### Yarn Workspaces

Docs: https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/

Using [yarn workspace feature](https://yarnpkg.com/en/docs/workspaces), configure the following files:

* /package.json

Append the `workspaces` key.

```json
{
  "private": true,
  "workspaces": [
    "packages/*",
    "services/*"
  ]
}
```

### Lerna

Docs: https://github.com/lerna/lerna

Provides two types of package versioning: exact and independent.

* exact - versions are equal and defined in `lerna.json`
* independent - versions are independent and maintained by developer

### Publishing

By invoking `lerna publish` under the hood it will check what packages have been changes since last release (the last git tag)

### Configuring

* lerna.json

Set `npmClient` `"yarn"` and turn `useWorkspaces` on.

```json
{
  "lerna": "2.2.0",
  "packages": [
    "packages/*",
    "services/*"
  ],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "independent"
}
```

Exec `yarn install`(or `lerna bootstrap`). After successful running, all dependency packages are downloaded under the repository root `node_modules` directory.

### Dependencies between packages
In this example, the `home-quote` service depends on two packages, `core` and `app`. So to execute (or test) `home-quote`, `core` and `app` packages should be installed.
`yarn` solve it. This command create sim-link of each packages into the top-level `node_modules` dir.

## Pros and cons:

### Pros:
automatically link all packages/services between themselves
only one .eslint config
only one .npmrc config
only one .babelrc config
finding something in dependent project is easier (no need to open another editor window and search there)
`yarn install` is quicker, because same dependencies are shared in root `node_modules`
code review can be done inside one repo, so tracking what have been changed can be easier

### Cons:
CI build time,

## Integrating frontend monorepo with .net
From my point of view it will complicate our frontend solution as there are no tools such as lerna to help us with managing .net and javascript projects at the same time.

#### To read:
https://hackernoon.com/one-vs-many-why-we-moved-from-multiple-git-repos-to-a-monorepo-and-how-we-set-it-up-f4abb0cfe469
https://github.com/lerna/lerna
https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/

#### To watch:
Uber Technology Day: Monorepo to Multirepo and Back Again: https://www.youtube.com/watch?v=lV8-1S28ycM&t=306s

## Things we can adopt with monorepo:

* Conventional commits (https://conventionalcommits.org) which are supported by lerna with automatic CHANGELOG generation (see: https://github.com/lerna/lerna#--conventional-commits)
  By this we can get rid of manual version change inside package.json.
