`1. BOTH - docker build -t test-subject-selector-base-build:1.0 -f pipeline-build-base.dockerfile .
docker run -it test-subject-selector-base-build:1.0 /bin/sh

# Linting

docker build -t test-subject-selector-design-lint:1.0 --build-arg VERSION=1.0 -f pipeline-lint-design.dockerfile .

# Build storybook first as we will be using the built library when building the app

2. SB - docker build -t test-subject-selector-storybook-build:1.0 --build-arg VERSION=1.0 -f pipeline-build-storybook.dockerfile .
   docker run -it test-subject-selector-storybook-build:1.0 /bin/sh

APP - docker build -t test-subject-selector-app-build:1.0 --build-arg VERSION=1.0 -f pipeline-build-app.dockerfile .
docker run -it test-subject-selector-app-build:1.0 /bin/sh

1. SB - docker build -t test-subject-selector-storybook-runtime:1.0 --build-arg VERSION=1.0 -f pipeline-runtime-storybook.dockerfile .

APP - docker build -t test-subject-selector-app-runtime:1.0 --build-arg VERSION=1.0 -f pipeline-runtime-app.dockerfile .

2. SB - docker run -p443:443 test-subject-selector-storybook-runtime:1.0
   APP - docker run -p443:443 test-subject-selector-app-runtime:1.0

OR for debug

1. docker run -p443:443 -it --entrypoint /bin/sh test-subject-selector-storybook-runtime:1.0
