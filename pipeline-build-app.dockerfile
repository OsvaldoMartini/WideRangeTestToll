ARG VERSION
FROM test-subject-selector-base-build:${VERSION} as base-build

FROM node:16.13-alpine

WORKDIR /subject-selector-design

COPY --from=base-build /subject-selector-design/ .

# Build the library that will be used in the app.
RUN yarn build
RUN cp ./src/data/images/* ./dist
#RUN cp -r ./src/styles/Fonts ./src/styles/custom_fonts

WORKDIR /subject-selector-app

COPY --from=base-build /subject-selector-app/ .

RUN yarn add ../subject-selector-design
#cp ../subject-selector-design/src/data/images/* ./build/images
RUN yarn build
