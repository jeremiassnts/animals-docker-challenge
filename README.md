# DESCRIPTION
This project was created to practice the configuration of a multi app docker environment, and it is composed by:
#### A node/nest api, just with 4 routes:
- GET /animals => list all created animals on database
- GET /animals/:animalId => find the animal by id
- POST /animals => create an animal (name, species, binomial_name, photo_url, born_date)
- DELETE /animals/:animalId => delete an animal
#### A Postgres database with following environment variables
- POSTGRES_USER
- POSTGRES_PASSWORD
- DATABASE_URL

To initialize the project just execute the following command<br>
`docker-compose up -d`<br>
After the creation of both containers, execute this command<br>
`docker container exec -it animals-api 'npx prisma migrate deploy'`
#### Now the application is ready