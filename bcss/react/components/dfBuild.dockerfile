FROM node:16.13-alpine as build

ARG VERSION
# Set this to the branch you consider to be the branch where a successful build of the component
# library will result in it being published to Nexus with the `latest` tag and version
# number taken from the package.json.
# For now we are going to use epic branch 8801, but in the future it will be develop.
#ENV PUBLISH_LATEST_BRANCH='develop'
ENV PUBLISH_LATEST_BRANCH='bcss-8801'

WORKDIR /components
COPY ./react/components .
# Copy in this file so we can access Nexus.
COPY ./react/assets/.npmrc .

RUN npm install

# Discovered that I had to rebuild SASS in Apline otherwise get horrible errors on Storybook build.
# See this link https://github.com/sass/node-sass/issues/2536
RUN npm rebuild node-sass

# We must do a build of the component library so diff detects changes when compare to the `latest`
# version in out npm registry (Nexus at the moment).
RUN npm run build

# Just to check...
RUN echo "Version: ${VERSION}"

# Publish a new 'latest' version if we are on the 'develop' branch and there is a change.
# Determine if there is a change by comparing local project with the 'latest' in Nexus; that's what `npm diff` does.
# NOTE 1: This will fail if the develop has made a change but forgotten to change the version; we want this.
# NOTE 2: The double dash is npm syntax that allows passing through of additional paramaters.
#         Explicitly tagging the release as 'latest', just to be clear. Also see NOTE 3 below.
# NOTE 3: For debugging you can add a line after the run below that output DIFF with echo $DIFF;
#         Don't forget the semi-colon.
RUN DIFF=$(npm diff) ; \
    if [[ "x$DIFF" != "x" ]] && [[ "$VERSION" == "$PUBLISH_LATEST_BRANCH*" ]] ; \
    then \
      echo ======== PUBLISH LATEST ========== ; \
      npm run publish-ci -- --tag latest ; \
    else \
      echo ======== DO NOT PUBLISH LATEST, NOT ON PUBISH LATEST BRANCH: ${PUBLISH_LATEST_BRANCH}, OR NO CODE CHANGES ======= ; \
    fi

# Version, Build and publish the 'ci' version of component library.
# NOTE 1: We create a 'ci' version even when on the PUBLISH_LATEST_BRANCH. This just means we have minimal code in
#         the dockerfile for the React apps, and just avoids complexity.
# NOTE 2: Command does not like underscore in the version, so replace with dot.
# NOTE 3: The dash has to be used after 0.0.0 as only this format is considered valid. I.e. a dot cannot be used.
RUN npm version 0.0.0-`echo $VERSION | sed 's/_/./g'`

# NOTE 1: We've already done the build so just publish using our npm script.
# NOTE 2: The script can't be called publish otherwise you end up with a circular call.
# NOTE 3: We want to tag our release as 'ci', or anything but 'latest', which is the default.
#         If we don't do this anyone doing an npm install without specifying the version
#         would get the branch (ci) version thinking it's the latest.
RUN npm run publish-ci -- --tag ci

# Build storybook ready to deploy
RUN npm run build-storybook

# Prepare the image that will be used to deploy Storybook.
FROM node:16.13-alpine as storybook-runtime

WORKDIR /storybook-static

COPY --from=build /components/storybook-static/ .
COPY ./react/components/server.crt .
COPY ./react/components/server.key .

RUN npm install -g http-server

EXPOSE 443

ENTRYPOINT http-server -p443 --ssl --cert /storybook-static/server.crt --key /storybook-static/server.key
