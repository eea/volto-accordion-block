# volto-accordion-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-accordion-block)](https://github.com/eea/volto-accordion-block/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-accordion-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-accordion-block/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-accordion-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-accordion-block/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block&branch=develop)

[Volto](https://github.com/plone/volto) accordions block.

## Features

- [Accordion Component Storybook](https://eea.github.io/eea-storybook/?path=/story/components-accordion--default).

![Volto Block Accordion](https://raw.githubusercontent.com/eea/volto-accordion-block/master/docs/volto-accordion-block.gif "Volto Block Accordion")


## Getting started

### Try volto-accordion-block with Docker

      git clone https://github.com/eea/volto-accordion-block.git
      cd volto-accordion-block
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use:

      VOLTO_VERSION=17 make
      VOLTO_VERSION=17 make start

### Add volto-accordion-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-accordion-block": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-accordion-block'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Upgrade

### Upgrading to 13.x

> This version requires `Volto >= 17.18` or `Volto 18+`. It removes the custom `EditBlockWrapper` and `NewBlockAddButton` components in favor of Volto's built-in block chrome provided by `BlocksForm`.

#### Breaking changes

- **Removed the "Section help" button.** The `?` icon that appeared in the inner block toolbar and opened the sidebar to display editing instructions has been removed. The `instructions` field is still available in the accordion schema and still rendered in the sidebar panel, but there is no longer a per-block shortcut button to reveal it.
- **Removed `EditBlockWrapper.jsx` and `NewBlockAddButton.jsx`.** Any code importing these from `@eeacms/volto-accordion-block` will break. Use Volto's built-in `EditBlockWrapper` from `@plone/volto/components/manage/Blocks/Block/EditBlockWrapper` if you need a custom wrapper.
- **`disableInnerButtons`** is now implemented via a CSS class (`.disable-inner-buttons`) instead of a JS-level `disabled` prop on the removed wrapper.

## Release

See [RELEASE.md](https://github.com/eea/volto-accordion-block/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-accordion-block/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-accordion-block/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
