ARG VERSION
FROM test-subject-selector-storybook-build:${VERSION} as storybook-build

FROM node:16.13-alpine

WORKDIR /storybook-static

COPY --from=storybook-build /subject-selector-design/storybook-static/ .

COPY ./server.crt .
COPY ./server.key .

RUN ls -al

# RUN npm install -g serve
RUN npm install -g http-server

EXPOSE 443

# NOTE: To get this to work, server has to be run in the same directory as the static website built for
# storybook. Using the -s flag doesn't work. I worked this out from this link...
# https://v4-0-10--storybooks.netlify.app/basics/exporting-storybook/
# ENTRYPOINT serve -n -d -l 443 --ssl-cert /storybook-static/server.crt --ssl-key /storybook-static/server.key
ENTRYPOINT http-server -p443 --ssl --cert /storybook-static/server.crt --key /storybook-static/server.key