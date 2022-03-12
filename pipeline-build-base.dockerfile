# All this does is the prep for the actual builds.
# These builds for storybook and the app will be carried out in seperate parallel stages using this
# work done in this dockerfile.
FROM node:16.13-alpine

WORKDIR /subject-selector-design
COPY ./subject-selector-design .

#RUN cp -r ./src/styles/Fonts ./src/styles/custom_fonts 2>/dev/null || :

RUN yarn

WORKDIR /subject-selector-app
COPY ./subject-selector-app .

RUN yarn


