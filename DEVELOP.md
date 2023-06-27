# volto-accordion-block

## Develop

Before starting make sure your development environment is properly set. See [Volto Developer Documentation](https://docs.voltocms.com/getting-started/install/)

1.  Make sure you have installed `yo`, `@plone/generator-volto` and `mrs-developer`

        npm install -g yo @plone/generator-volto mrs-developer

1.  Create new volto app

        yo @plone/volto my-volto-project --addon @eeacms/volto-accordion-block --skip-install
        cd my-volto-project

1.  Add the following to `mrs.developer.json`:

        {
            "volto-accordion-block": {
                "url": "https://github.com/eea/volto-accordion-block.git",
                "package": "@eeacms/volto-accordion-block",
                "branch": "develop",
                "path": "src"
            }
        }

1.  Install

        make develop
        yarn

1.  Start backend

        docker pull plone
        docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone

    ...wait for backend to setup and start - `Ready to handle requests`:

        docker logs -f plone

    ...you can also check http://localhost:8080/Plone

1.  Start frontend

        yarn start

1.  Go to http://localhost:3000

1.  Happy hacking!

        cd src/addons/volto-accordion-block/

## Cypress

To run cypress locally, first make sure you don't have any Volto/Plone running on ports `8080` and `3000`.

You don't have to be in a `clean-volto-project`, you can be in any Volto Frontend 
project where you added `volto-accordion-block` to `mrs.developer.json`

Go to:

        cd src/addons/volto-accordion-block/

Start:

        make
        make start

This will build and start with Docker a clean `Plone backend` and `Volto Frontend` with `volto-accordion-block` block installed.

Run:

        make cypress

Or:

        make cypress-run

The hot-reload should work