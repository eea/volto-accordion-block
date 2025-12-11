const fs = require('fs');
const path = require('path');
const projectRootPath = fs.realpathSync(__dirname + '/../../../');

let voltoPath = path.join(projectRootPath, 'node_modules/@plone/volto');
let configFile;
if (fs.existsSync(`${projectRootPath}/tsconfig.json`))
  configFile = `${projectRootPath}/tsconfig.json`;
else if (fs.existsSync(`${projectRootPath}/jsconfig.json`))
  configFile = `${projectRootPath}/jsconfig.json`;

if (configFile) {
  const jsConfig = require(configFile).compilerOptions;
  const pathsConfig = jsConfig.paths;
  if (pathsConfig['@plone/volto'])
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig['@plone/volto'][0]}`;
}

const AddonConfigurationRegistry = require(`${voltoPath}/addon-registry.js`);
const reg = new AddonConfigurationRegistry(projectRootPath);

// Extends ESlint configuration for adding the aliases to `src` directories in Volto addons
const addonAliases = Object.keys(reg.packages).map((o) => [
  o,
  reg.packages[o].modulePath,
]);

const addonExtenders = reg.getEslintExtenders().map((m) => require(m));

const defaultConfig = {
  extends: `${voltoPath}/.eslintrc`,
  rules: {
    'import/no-unresolved': 1,
    'import/named': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'no-restricted-imports': [
      'error',
      {
        name: '@plone/volto/components',
        message:
          'Importing from barrel files is not allowed. Please use direct imports of the modules instead.',
      },
      {
        name: '@plone/volto/helpers',
        message:
          'Importing from barrel files is not allowed. Please use direct imports of the modules instead.',
      },
      {
        name: '@plone/volto/actions',
        message:
          'Importing from barrel files is not allowed. Please use direct imports of the modules instead.',
      },
    ],
    'react/jsx-key': [2, { checkFragmentShorthand: true }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', '@plone/volto/src'],
          ['@plone/volto-slate', '@plone/volto/packages/volto-slate/src'],
          ...addonAliases,
          ['@package', `${__dirname}/src`],
          ['@root', `${__dirname}/src`],
          ['~', `${__dirname}/src`],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
  rules: {
    'react/jsx-no-target-blank': [
      'error',
      {
        allowReferrer: true,
      },
    ],
  }
};

const config = addonExtenders.reduce(
  (acc, extender) => extender.modify(acc),
  defaultConfig,
);

module.exports = config;
