# Multi Stage Dockerfile
FROM node:14.15.1 as build 
WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

# To do few minor jobs as production version
RUN npm ci --production

COPY . .

RUN npm run build-storybook

# NGNIX Web Server
FROM nginx:1.14.0-alpine as prod

COPY --from=build /code/storybook-static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
