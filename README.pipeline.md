Build the build image
```shell
docker build -t test-subject-selector-build:1.0 -f pipeline-build.dockerfile .
```

Run the build image for debugging
```shell
docker run -it test-subject-selector-build:1.0 /bin/sh
```

Build the runtime image...
```shell
docker build -t test-subject-selector-runtime:1.0 --build-arg VERSION=1.0 -f pipeline-runtime.dockerfile .
```

Run the runtime image for debugging
```shell
docker run -p3000:3000 test-subject-selector-runtime:1.0
```

Or override entry point
```
docker run -it --entrypoint /bin/sh test-subject-selector-runtime:1.0
```





docker build -t test-subject-selector-base-build:1.0 --build-arg VERSION=1.0 -f pipeline-build-base.dockerfile .

docker build -t test-subject-selector-app-build:1.0 --build-arg VERSION=1.0 -f pipeline-build-app.dockerfile .