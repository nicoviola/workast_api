# workast_api

### Manteiners
* Nicolás Viola (nico.v.88@gmail.com)

## Requeriments

To run && work on the project you need to have the following installed
- [Docker] 
- [Docker Compose]

## Installation 

- Rename the .env.dist file to .env



- Build the container
````bash
   $ docker-compose build
````

- Run the app

````bash
    $ docker-compose up
````

## Tests

To run commands on the container, execute _$docker exec -it <container_name> bash and then:
-Run the tests:
````bash
    $ npm run test
````

To run tests in a separate container. 
````bash
    $ docker-compose -f docker-compose.test.yml
````

Documentation 
apidoc is not ready functional, so look for each individual route file ./routes/* for endpoint documentation. 

Header: 
Include custom header "x-api-key": env.API_KEY in your requests to avoid 'Not allowed by cors' error
