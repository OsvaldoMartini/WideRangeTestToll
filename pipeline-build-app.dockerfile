ARG VERSION
FROM test-subject-selector-base-build:${VERSION} as base-build

FROM node:16.13-alpine

RUN rm -rf tmp

RUN mkdir tmp

WORKDIR /subject-selector-design

COPY --from=base-build /subject-selector-design/ .

# Build the library that will be used in the app.
RUN yarn build

WORKDIR /subject-selector-app

COPY --from=base-build /subject-selector-app/ .

RUN rm -rf components

RUN mkdir components

RUN cp -r -f /subject-selector-design/dist/* components

WORKDIR /subject-selector-app/components

RUN npm init -force

RUN yarn link

WORKDIR /subject-selector-app

RUN yarn link components

RUN yarn build

