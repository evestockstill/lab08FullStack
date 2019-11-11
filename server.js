/* eslint-disable no-undef */
// Load Environment Variables from the .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.use(morgan('dev')); 
app.use(cors()); 
app.use(express.static('Public')); 
app.use(express.json()); 


app.get('/api/monkeys', async (req, res) => {

    try {
        // 
        const result = await client.query(`
            SELECT
                m.*,
                t.name as type
            FROM monkeys m
            JOIN types t
            ON   m.type_id = t.id
            ORDER BY m.weight;
        `);

        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }

});

app.post('/api/monkeys', async (req, res) => {
    const monkey = req.body;

    try {
        const result = await client.query(`
            INSERT INTO monkeys (name, image, old_world, new_world, weight, type_id, summary)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `,
        [monkey.name, monkey.image, monkey.old_world, monkey.new_world, monkey.weight, monkey.typeID, monkey.summary]
        );

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('/api/monkeys/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query(`
            SELECT
            m.*,
            t.name as type
            FROM monkeys m
            JOIN types t
            ON m.type_id = m.id
            WHERE c.id = $1
            `,
        [id]);


        const monkey = result.rows[0];
        if (!monkey) {
            res.status(404).json({
                error: `Monkey id ${id} does not exist`
            });
        }
        else {
            res.json(result.rows[0]);
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.post('/api/monkeys', async (req, res) => {
    const monkey = req.body;

    try {
        const result = await client.query(`
            INSERT INTO monkeys (name, image, old_world, new_world, weight, type_id, summary)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `,
        [monkey.name, monkey.image, monkey.old_world, monkey.new_world, monkey.weight, monkey.typeID, monkey.summary]
        );

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('/api/types', async (req, res) => {
    try {
        const result = await client.query(`
            SELECT *
            FROM types
            ORDER BY name;
        `);
        
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});