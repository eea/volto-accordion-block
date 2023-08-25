# volto-accordion-block

## Develop

### With Docker

1. Make sure you have `docker` and `docker compose` installed and running on your machine:

    ```bash
    git clone https://github.com/eea/volto-accordion-block.git
    cd volto-accordion-block
    git checkout -b bugfix-123456 develop
    make
    make start
    ```

1. Wait for `Volto started at 0.0.0.0:3000` meesage

1. Go to http://localhost:3000

1.  Happy hacking!

    ```bash
    cd src/addons/volto-accordion-block/
    ```

### Or add volto-accordion-block to your Volto project

Before starting make sure your development environment is properly set. See [Volto Developer Documentation](https://6.docs.plone.org/volto/getting-started/install.html)

1.  Make sure you have installed `yo`, `@plone/generator-volto` and `mrs-developer`

    ```bash
    npm install -g yo @plone/generator-volto mrs-developer
    ```

1.  Create new volto app

    ```bash
    yo @plone/volto my-volto-project --addon @eeacms/volto-accordion-block --skip-install
    cd my-volto-project
    ```

1.  Add the following to `mrs.developer.json`:

    ```JSON
    {
        "volto-accordion-block": {
            "url": "https://github.com/eea/volto-accordion-block.git",
            "package": "@eeacms/volto-accordion-block",
            "branch": "develop",
            "path": "src"
        }
    }
    ```

1.  Install

    ```bash
    yarn
    ```

1.  Start backend

    ```bash
    docker compose up backend
    ```

    ...wait for backend to setup and start - `Ready to handle requests`:

    ...you can also check http://localhost:8080/Plone

1.  Start frontend

    ```bash
    yarn start
    ```

1.  Go to http://localhost:3000

1.  Happy hacking!

    ```bash
    cd src/addons/volto-accordion-block/
    ```

## Cypress

To run cypress locally, first make sure you don't have any Volto/Plone running on ports `8080` and `3000`.

You don't have to be in a `clean-volto-project`, you can be in any Volto Frontend 
project where you added `volto-accordion-block` to `mrs.developer.json`

Go to:

  ```bash
  cd src/addons/volto-accordion-block/
  ```

Start:

  ```bash
  make
  make start
  ```

This will build and start with Docker a clean `Plone backend` and `Volto Frontend` with `volto-accordion-block` block installed.

Open Cypress Interface:

  ```bash
  make cypress-open
  ```

Or run it:

  ```bash
  make cypress-run
  ```
