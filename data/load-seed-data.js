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
                    INSERT INTO monkeys (name, url, old_world, new_world, common_weight, common_height, summary)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                `, 
                
                [monkey.name, monkey.url, monkey.old_world, monkey.new_world, monkey.common_weight, monkey.common_height, monkey.summary]);

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