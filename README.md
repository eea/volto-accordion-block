# volto-accordion-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-accordion-block)](https://github.com/eea/volto-accordion-block/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-accordion-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-accordion-block/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-accordion-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-accordion-block/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block-develop)

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

### Add volto-accordion-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-accordion-block"
   ],

   "dependencies": {
       "@eeacms/volto-accordion-block": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-accordion-block
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

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
