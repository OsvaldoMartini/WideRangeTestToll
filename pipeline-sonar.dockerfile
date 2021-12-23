ARG VERSION
FROM test-subject-selector-base-build:${VERSION} as base-build

FROM sonarsource/sonar-scanner-cli

WORKDIR /src/app

# NOTE: Only scan src code - definately don't want to be scanning node_modules.
COPY --from=base-build /subject-selector-app/src .

WORKDIR /src/storybook

# NOTE: Only scan src code - definately don't want to be scanning node_modules.
COPY --from=base-build /subject-selector-design/src .

WORKDIR /src

ARG SONARQUBE_SERVER_URL
ARG SONARQUBE_JENKINS_TOKEN
ARG PROJECT_KEY

RUN echo "SonarQube Project Key: $PROJECT_KEY"
RUN echo "SonarQube URL: $SONARQUBE_SERVER_URL"
RUN echo "SonarQube Token: $SONARQUBE_JENKINS_TOKEN"

# NOTE: We don't want to use the default Texas Sonarqube instance.
RUN sonar-scanner \
  -Dsonar.host.url=$SONARQUBE_SERVER_URL \
  -Dsonar.login=$SONARQUBE_JENKINS_TOKEN \
  -Dsonar.projectKey=$PROJECT_KEY
  