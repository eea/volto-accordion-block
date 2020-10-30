# volto-accordion-block
[![Releases](https://img.shields.io/github/v/release/eea/volto-accordion-block)](https://github.com/eea/volto-accordion-block/releases)

[Volto](https://github.com/plone/volto) add-on to create group based accordions in blocks.

## Features


## Getting started

1. Create new volto project if you don't already have one:
    ```
    $ npm install -g @plone/create-volto-app
    $ create-volto-app my-volto-project
    $ cd my-volto-project
    ```

1. Update `package.json`:
    ``` JSON
    "addons": [
        "@eeacms/volto-blocks-form",
        "@eeacms/volto-accordion-block"
    ],

    "dependencies": {
        "@eeacms/volto-blocks-form": "github:eea/volto-blocks-form#0.4.0",
        "@eeacms/volto-accordion-block": "github:eea/volto-accordion-block#0.1.0"
    }
    ```

1. Install new add-ons and restart Volto:
    ```
    $ yarn
    $ yarn start
    ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-accordion-block/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-accordion-block/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
