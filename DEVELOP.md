# volto-accordion-block

## Develop

1. Make sure you have `docker` and `docker compose` installed and running on your machine:

    ```Bash
    git clone https://github.com/eea/volto-accordion-block.git
    cd volto-accordion-block
    git checkout -b bugfix-123456 develop
    make
    make start
    ```

   `make start` defaults to Volto 18. Use `make VOLTO_VERSION=17 start` to test the Volto 17 dev environment.

1. Wait for `Volto started at 0.0.0.0:3000` meesage

1. Go to http://localhost:3000

1. Initialize git hooks

    ```Bash
    yarn prepare
    ```

1. Happy hacking!

### Or add @eeacms/volto-accordion-block to your Volto project

Before starting make sure your development environment is properly set. See the official Plone documentation for [creating a project with Cookieplone](https://6.docs.plone.org/install/create-project-cookieplone.html) and [installing an add-on in development mode in Volto 18 and 19](https://6.docs.plone.org/volto/development/addons/install-an-add-on-in-development-mode-volto-18.html).

For new Volto 18+ projects, use Cookieplone. The official Plone documentation deprecated `@plone/volto-generator` in Volto 18, and Cookieplone includes `mrs-developer` by default.

1.  Create a new Volto project with Cookieplone

        uvx cookieplone project
        cd project-title

1.  Add the following to `mrs.developer.json`:

        {
            "volto-accordion-block": {
                "output": "packages",
                "url": "https://github.com/eea/volto-accordion-block.git",
                "package": "@eeacms/volto-accordion-block",
                "branch": "develop",
                "path": "src"
            }
        }

1.  Add `@eeacms/volto-accordion-block` to the `addons` key in your project `package.json`

1.  Install or refresh the project setup

        make install

1.  Start backend in one terminal

        make backend-start

    ...wait for backend to setup and start, ending with `Ready to handle requests`

    ...you can also check http://localhost:8080/Plone

1.  Start frontend in a second terminal

        make frontend-start

1.  Go to http://localhost:3000

1.  Happy hacking!

        cd packages/volto-accordion-block

For legacy Volto 17 projects, keep using the yarn-based workflow from the Volto 17 documentation, but do not use `@plone/volto-generator` for new projects.

## Cypress

To run cypress locally, first make sure you don't have any Volto/Plone running on ports `8080` and `3000`.

You don't have to be in a `clean-volto-project`, you can be in any Volto Frontend
project where you added `volto-accordion-block` to `mrs.developer.json`

Go to:

  ```BASH
  cd packages/volto-accordion-block/
  ```

Start:

  ```Bash
  make
  make start
  ```

This will build and start with Docker a clean `Plone backend` and `Volto Frontend` with `volto-accordion-block` block installed.

Use `make VOLTO_VERSION=17 start` if you need to reproduce the Volto 17 setup locally.

Open Cypress Interface:

  ```Bash
  make cypress-open
  ```

Or run it:

  ```Bash
  make cypress-run
  ```

## Prettier

[Prettier](https://www.npmjs.com/package/prettier) is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it
with its own rules that take the maximum line length into account, wrapping code when necessary.

Run ``prettier`` linter, executing the following command:

  ```bash
  make prettier
  ```

To fix the ``prettier`` warnings, execute the following command:

  ```bash
  make prettier-fix
  ```

---

## Eslint

[ESLint](https://www.npmjs.com/package/eslint) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

Eslint should run just fine using the setup config from Cookieplone projects and legacy Volto projects.

If for some reason that doesn't work, and you need to manually install eslint,
you can also use the following steps to install eslint.

For installing ``eslint``, execute the following command:

  ```bash
  yarn add --dev eslint eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react-hooks eslint-plugin-import eslint-plugin-flowtype
  ```

For setting up ``eslint``, execute the following command:

  ```bash
  cp .project.eslintrc.js .eslintrc.js
  ```

Run ``eslint``, executing the following command:

  ```bash
  make lint
  ```

To fix the problems found by ``eslint``, execute the following command:

  ```bash
  make lint-fix
  ```

---

## Stylelint

[Stylelint](https://www.npmjs.com/package/stylelint) is a mighty CSS linter that helps you avoid errors and enforce conventions.

For installing ``stylelint``, execute the following command:

  ```bash
  yarn add --dev stylelint
  ```

To run ``stylelint``, execute the following command:

  ```bash
  make stylelint
  ```

If you need to run ``stylelint`` on styles found in .overrides files, execute the following command:

  ```bash
  make stylelint-overrides
  ```

To auto fix the found issues by ``stylelint``, execute the following command:

  ```bash
  make stylelint-fix
  ```


## Internationalization (i18) and localization (l10n)

See [Internationalization](https://6.docs.plone.org/volto/development/i18n.html) and [Translate Volto](https://6.docs.plone.org/i18n-l10n/contributing-translations.html#translate-volto).
