FROM node:16.13-alpine

WORKDIR /subject
COPY ./react/assets/.npmrc .
COPY ./react/subject/src ./src
COPY ./react/subject/public ./public
COPY ./react/subject/package.json .
COPY ./react/subject/package-lock.json .
COPY ./react/subject/tsconfig.json .
COPY ./react/subject/.env .

ARG VERSION

# Install the branch version of the component library
RUN npm install @bcss/react-components@0.0.0-`echo $VERSION | sed 's/_/./g'`
# Install the rest of the modules
RUN npm install

RUN npm run-script build
