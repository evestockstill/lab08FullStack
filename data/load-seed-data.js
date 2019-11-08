require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const types = require('./types.js');
const monkeys = require('./monkeyObject.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);
 
    try {
        await client.connect();

        const savedTypes = await Promise.all(
            types.map(async type => {
                const result = await client.query(`
                    INSERT INTO types (name)
                    VALUES ($1)
                    RETURNING *;
                    
                    `,
                    
                [type]);

                return result.rows[0];

            })
        );

        [
            { name: 'Atelidae', id: 1 },
            { name: 'Callitrichidae', id: 2 },
            { name: 'Cebidae', id: 3 },
            { name: 'Cercopithecidae', id: 4 },   

        ];

        [
            {
                name: 'Golden lion tamarin',
                image: './Public/assets/golden-lion-tamarin_thumb.jpeg',
                old_world: false,
                new_world: true,
                weight: '2',
                type: 'Callitrichidae',
                summary: 'Golden lion tamrin sleep in nest which they frequently move in order to reduce leaving scents in fear of predators finding them. They tend to live in groups of 2 to 8 members.'
            },

        ];
            
        await Promise.all(
            monkeys.map(monkey => {

                const type = savedTypes.find(type => {
                    return type.name === monkey.type;
                });
                return client.query(`
                        INSERT INTO monkeys (name, image, old_world, new_world, weight, type_id, summary)
                        VALUES ($1, $2, $3, $4, $5, $6, $7);
                    `, 
                [monkey.name, monkey.image, monkey.old_world, monkey.new_world, monkey.weight, type.id, monkey.summary]);
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


