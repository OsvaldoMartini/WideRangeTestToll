## Create Net image
``
docker build -t rest-api-net:1.0.0-dev .
``

## Docker Run
``
docker run --name ec-rest-api-net -p:5000:5000 -d rest-api-net:1.0.0-dev
``

## Creating Client-App Image
``
docker build -t wide-range-tool:1.0.0-dev .
``
## Run Image Mount Bind Execution Bind Mount Volume *-v{pwd} -> Print Work Directory*
``
docker run --rm -it --name ec-winde-range -p 49152:3000 -v ${pwd}:/code wide-range-tool:1.0.0-dev
``
## Production Image as Multi-Stage building
``
docker build -t wide-range-tool:release-1.0.0 .
``
## Run Production Image
``
docker run --rm -it --name ec-winde-range-prod -p 3005:80 wide-range-tool:release-1.0.0
``
## TAG the image
``
docker tag wide-range-tool:1.0.0-prod omartini/wide-range-tool:release-1.0.0
``
## Push and Publish to Repository *Docker Hub*
``
docker push omartini/wide-range-tool:release-1.0.0
``
