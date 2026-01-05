<!--
SPDX-FileCopyrightText: 2025 PNED G.I.E.

SPDX-License-Identifier: CC-BY-4.0
-->

[![REUSE status](https://api.reuse.software/badge/github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture)](https://api.reuse.software/info/github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture)
![example workflow](https://github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture/actions/workflows/test.yml/badge.svg)
![example workflow](https://github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture/actions/workflows/deploy.yml/badge.svg)
[![GitHub contributors](https://img.shields.io/github/contributors/GenomicDataInfrastructure/oneplusmg-reference-architecture)](https://github.com/GenomicDataInfrastructure/oneplusmg-reference-architecture/graphs/contributors)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Licenses

This work is licensed under multiple licences:

- All original source code is licensed under [Apache-2.0](./LICENSES/Apache-2.0.txt).
- All documentation and images are licensed under [CC-BY-4.0](./LICENSES/CC-BY-4.0.txt).
- For more accurate information, check the individual files.
