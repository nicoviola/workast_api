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

To run tests in a separate container and execute the test. 
````bash
    $ docker-compose -f docker-compose.test.yml
````