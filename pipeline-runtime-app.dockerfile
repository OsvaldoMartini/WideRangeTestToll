ARG VERSION
FROM test-subject-selector-app-build:${VERSION} as build

FROM node:16.13-alpine

WORKDIR /app/build

COPY --from=build /subject-selector-app/build/ .

WORKDIR /app
COPY ./server.crt .
COPY ./server.key .

RUN ls -al

RUN npm install -g serve

EXPOSE 443

ENTRYPOINT serve -s build -l 443 --ssl-cert /app/server.crt --ssl-key /app/server.key
