require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const monkeys = require('./monkeyObject.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);
 
    try {
        await client.connect();

        // "Promise all" does a parallel execution of async tasks
        await Promise.all(
            // map every item in the array data
            monkeys.map(monkey => {
                

                return client.query(`
                    INSERT INTO monkeys (name, image, old_world, new_world, weight, type, summary)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                `, 
                
                [monkey.name, monkey.image, monkey.old_world, monkey.new_world, monkey.weight, monkey.type, monkey.summary]);

            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }

}