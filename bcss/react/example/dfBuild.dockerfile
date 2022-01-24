FROM node:16.13-alpine

WORKDIR /subject
COPY ./react/assets/.npmrc .
COPY ./react/example/src ./src
COPY ./react/example/public ./public
COPY ./react/example/package.json .
COPY ./react/example/package-lock.json .
COPY ./react/example/tsconfig.json .

ARG VERSION

# Install the branch version of the component library
RUN npm install @bcss/react-components@0.0.0-`echo $VERSION | sed 's/_/./g'`
# Install the rest of the modules
RUN npm install

RUN npm run build
