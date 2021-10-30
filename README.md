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
