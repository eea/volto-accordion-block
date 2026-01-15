# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION}

ARG ADDON_NAME
ARG ADDON_PATH

# Install Cypress dependencies (Xvfb, etc.) for integration tests
USER root
RUN apt-get update -q \
    && apt-get install -qy --no-install-recommends \
       libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    && rm -rf /var/lib/apt/lists/*
USER node

COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/

RUN /setupAddon
RUN yarn add jest-junit
RUN yarn install

ENTRYPOINT ["yarn"]
CMD ["start"]
