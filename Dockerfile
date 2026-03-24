# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION}

ARG ADDON_NAME
ARG ADDON_PATH
ARG VLT_ENABLED
ARG VLT_PACKAGE_VERSION=7.8.2
ARG VLT_BM3_COMPAT_VERSION=1.0.0-alpha.1
ARG VLT_SLIDER_BLOCK_VERSION=6.4.1
ENV HOST="0.0.0.0"

# Install Cypress dependencies (matching eeacms/frontend-builder)
USER root
RUN apt-get update -q \
    && apt-get install -qy --no-install-recommends \
       chromium libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    && rm -rf /var/lib/apt/lists/*
USER node

COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/

RUN /setupAddon
RUN yarn add jest-junit
RUN if [ -n "${VLT_ENABLED}" ]; then yarn add @kitconcept/volto-light-theme@${VLT_PACKAGE_VERSION} @kitconcept/volto-bm3-compat@${VLT_BM3_COMPAT_VERSION} @kitconcept/volto-slider-block@${VLT_SLIDER_BLOCK_VERSION}; fi
RUN if [ -n "${VLT_ENABLED}" ]; then node -e "const fs = require('fs'); const path = '/app/package.json'; const pkg = JSON.parse(fs.readFileSync(path, 'utf8')); const addons = Array.isArray(pkg.addons) ? pkg.addons : []; pkg.theme = '@kitconcept/volto-light-theme'; pkg.addons = ['@kitconcept/volto-light-theme', ...addons.filter((addon) => addon !== '@kitconcept/volto-light-theme')]; fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');"; fi
RUN yarn install

ENTRYPOINT ["yarn"]
CMD ["start"]
