# @eeacms/volto-accordion-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-accordion-block)](https://github.com/eea/volto-accordion-block/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-accordion-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-accordion-block/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-accordion-block&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-accordion-block)

[Volto](https://github.com/plone/volto) accordions block.

## Features

- [Accordion Component Storybook](https://eea.github.io/eea-storybook/?path=/story/components-accordion--default).

![Volto Block Accordion](https://raw.githubusercontent.com/eea/volto-accordion-block/master/docs/volto-accordion-block.gif "Volto Block Accordion")

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

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

1. Go to http://localhost:3000

1. Happy editing!

## Upgrade

### Upgrading to 13.x

> This version requires `Volto >= 17.18` or `Volto 18+`. It removes the custom `EditBlockWrapper` and `NewBlockAddButton` components in favor of Volto's built-in block chrome provided by `BlocksForm`.

#### Breaking changes

- **Removed the "Section help" button.** The `?` icon that appeared in the inner block toolbar and opened the sidebar to display editing instructions has been removed. The `instructions` field is still available in the accordion schema and still rendered in the sidebar panel, but there is no longer a per-block shortcut button to reveal it.
- **Removed `EditBlockWrapper.jsx` and `NewBlockAddButton.jsx`.** Any code importing these from `@eeacms/volto-accordion-block` will break. Use Volto's built-in `EditBlockWrapper` from `@plone/volto/components/manage/Blocks/Block/EditBlockWrapper` if you need a custom wrapper.
- **`disableInnerButtons`** is now implemented via a CSS class (`.disable-inner-buttons`) instead of a JS-level `disabled` prop on the removed wrapper.

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
