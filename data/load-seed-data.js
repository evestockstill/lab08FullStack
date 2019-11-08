require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const monkeys = require('./monkeyObject.js');
const types = require('./types.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);
 
    try {
        await client.connect();

        // "Promise all" does a parallel execution of async tasks
        const savedTypes = await Promise.all(
            // map every item in the array data
            monkeys.map(async monkey => {
                const result = await client.query(`
                    INSERT INTO monkeys (name)
                    VALUES ($1)
                    RETURNING *;
                    
                    `,
                    
                [monkey]);

                return result.rows[0];

            })
        );
        [
            { name: 'Atelidae', id: 1 },
            { name: 'Callitrichidae', id: 2 },
            { name: 'Cebidae', id: 3 },
            { name: 'Cercopithecidae', id: 4 },
              

        ];
            
        await Promise.all(
            monkeys.map(monkey => {

                const types = savedTypes.find(type => {
                    return type.name === monkey.type;
                });
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


