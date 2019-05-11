### Installing database with docker
`docker run --name groundifly -p 0.0.0.0:27017:27017 -d mongo:latest`

### Bring back to life a closed docker instance
`docker ps -a`
and then
`docker start d25b44cb986e` but replace with yuor own container ID

### Running the server
`yarn install`
and then
`yarn start`