# Introduction

This document presents the main elements of the project.

## Technologies

The following tools are needed for this project:

| Techno  | Version          |
| ------- | ---------------- |
| Node.js | 18.16.17 minimum |
| npm     | 9.5.1 minimum    |

> **Note:** If you have several project depending on different versions of Node.js, you can use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to install different versions side by side.

> **Note:** To securely update npm on Windows, use the following tool: [npm-windows-upgrade](https://www.npmjs.com/package/npm-windows-upgrade).

# Configuration

At start, the project load a set of configurations from several sources (.env files, environment variables, ...).  
Les différentes sources sont chargées dans un ordre prédéfinie, si une configuration est présente dans plusieurs sources, c'est la dernière qui est prise en compte :

## Sources order

1. File .env
2. File .env.{environment}
3. File .env.development.local (only for Development environment)
4. Environment variables

## Used configurations 

| Key          | Type   | Secret | Location     | Use                                               | Note                             |
| ------------ | ------ | ------ | ------------ | ------------------------------------------------- | -------------------------------- |
| VITE_APP_ENV | string |        | File         | Environment under which the application runs      | Development, Staging, Production |

# Local development

## Install developement certificate

To code in local under the same conditions as production, installing an pour HTTP certificate is haighly recommended.  
Vous pouvez créer et valider simplement un certificat de développement local en utilisant l'outil `dotnet dev-certs` en suivant les étapes ci-dessous :

Install `dev-certs` tools in your machine

```shell
dotnet tool install -g dotnet-dev-certs
```

> **Note:** This command installs the tool glabaly in your machine (you don't need to launch it next time).

Add and validate a local certificate

```shell
dotnet dev-certs https -t -ep "<project-path>\localhost.pfx" -p "localhost"
```

> **Note:** This certificate is not linked to the current project, it can be used for **any other** project locally.

> **Note:** Please use the addresse https://localhost:44340 for development, otherwise you will have an error concerning the certificate.

## Dependencies install

```
npm install
```

### Launch local development server

```
npm run dev
```


