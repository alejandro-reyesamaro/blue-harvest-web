# Introduction

Ce document présente les principaux éléments du projet.

## Technologies

Les outils suivants sont nécessaires pour ce projet :

| Techno  | Version          |
| ------- | ---------------- |
| Node.js | 18.16.17 minimum |
| npm     | 9.5.1 minimum    |

> **Note :** Si vous avez des projets qui dépendent de différentes versions de Node.js, vous pouvez utiliser [nvm](https://github.com/creationix/nvm) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) pour installer plusieurs versions côte à côte.

> **Note :** Pour mettre à jour npm en sécurité sur Windows, utilisez l'outil [npm-windows-upgrade](https://www.npmjs.com/package/npm-windows-upgrade).

# Configuration

Au démarrage, le projet charge un ensemble de configurations depuis plusieurs sources (fichiers .env, variables d'environnements, ...).  
Les différentes sources sont chargées dans un ordre prédéfinie, si une configuration est présente dans plusieurs sources, c'est la dernière qui est prise en compte :

## Ordre des sources

1. Fichier .env
2. Fichier .env.{environnement}
3. Fichier .env.development.local (uniquement en environnment Development)
4. Variables d'environnement

## Configurations utilisées

| Clé          | Type   | Secret | Localisation | Utilisation                                       | Note                             |
| ------------ | ------ | ------ | ------------ | ------------------------------------------------- | -------------------------------- |
| VITE_APP_ENV | string |        | File         | Environnement sous lequel s'exécute l'application | Development, Staging, Production |

# Développement en local

## Installer le certificat de développement

Pour développer en local dans les mêmes conditions que la production, il est recommandé d'installer un certificat pour HTTPS.  
Vous pouvez créer et valider simplement un certificat de développement local en utilisant l'outil `dotnet dev-certs` en suivant les étapes ci-dessous :

Installer l'outil `dev-certs` sur votre machine

```shell
dotnet tool install -g dotnet-dev-certs
```

> **Note :** Cette commande installe l'outil globalement sur votre machine. Vous n'aurez pas besoin de relancer cette commande la prochaine fois.

Ajouter et valider un certificat local

```shell
dotnet dev-certs https -t -ep "<project-path>\localhost.pfx" -p "localhost"
```

> **Note :** Ce certificat n'est pas lié au projet en cours, il peut être utilisé pour **n'importe quel** site hébergé localement.

> **Note :** Veillez à bien utiliser l'adresse https://localhost:44340 lorsque vous développez, sinon vous aurez une erreur concernant le certificat.

## Installer les dépendances

```
npm install
```

### Lancer le serveur de développement local

```
npm run serve
```

### Analyser et corriger les fichiers avec ESLint

```
npm run lint
```

# Expert'Skills

Developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

