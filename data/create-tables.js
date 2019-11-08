require('dotenv').config();
const pg = require('pg');

const Client = pg.Client;

run();

async function run() {
    
    const client = new Client(process.env.DATABASE_URL);

    try {
       
        await client.connect();

        await client.query(`
          CREATE TABLE monkeys (
              id SERIAL PRIMARY KEY NOT NULL,
              name VARCHAR (256),
              image VARCHAR (256),
              old_world BOOLEAN NOT NULL,
              new_world BOOLEAN NOT NULL,
              weight VARCHAR (256),
              type VARCHAR (256),
              summary VARCHAR (256)
          )
        `);

        console.log('create tables complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }

}