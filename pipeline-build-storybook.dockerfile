ARG VERSION
FROM test-subject-selector-base-build:${VERSION} as base-build

FROM node:16.13-alpine

WORKDIR /subject-selector-design

COPY --from=base-build /subject-selector-design/ .

RUN yarn build-storybook
