# volto-addon-template
[![Releases](https://img.shields.io/github/v/release/eea/volto-addon-template)](https://github.com/eea/volto-addon-template/releases)

[Volto](https://github.com/plone/volto) add-on

## Features

###

Demo GIF

## Getting started

1. Create new volto project if you don't already have one:
    ```
    $ npm install -g yo @plone/generator-volto
    $ yo @plone/volto my-volto-project --addon @eeacms/volto-addon-template
    $ cd my-volto-project
    ```

1. If you already have a volto project, just update `package.json`:
    ``` JSON
    "addons": [
        "@eeacms/volto-addon-template"
    ],

    "dependencies": {
        "@eeacms/volto-addon-template": "1.0.0"
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

See [DEVELOP.md](https://github.com/eea/volto-addon-template/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-addon-template/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
