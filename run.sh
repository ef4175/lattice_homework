#!/usr/bin/env bash

if test "$#" -lt 1; then
  echo "Movie Database API key is required"
  exit 2
fi

docker build -t lattice_homework_api api
docker build -t lattice_homework_ui ui
MOVIE_DB_API_KEY=$1
API_CONTAINER_ID=`docker run -it -d --rm -e "MOVIE_DB_API_KEY=$MOVIE_DB_API_KEY" -p 8001:80 lattice_homework_api npm run start`
docker run -it --rm -p 8000:3000 lattice_homework_ui npm run start
docker rm -f $API_CONTAINER_ID
