const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.post("/clients", (req, res) => {
  const { type, name, surname, email } = req.body;
  connection.query(
    `INSERT INTO clients (type, name, surname, email) values (? ? ? ?)`,
    [type, name, surname, email],
    (error, results) => {
      if (error) return res.json({ error });
      res.send("Cliente guardado");
    }
  );
});

app.post("/ads", (req, res) => {
  const { advertiser_id, title, description } = req.body;
  connection.query(
    `INSERT INTO advertisements (advertiser_id, title, description) values (? ? ?)`,
    [advertiser_id, title, description],
    (error, results) => {
      if (error) return res.json({ error });
      res.send("Anuncio guardado");
    }
  );
});

app.post("/history", (req, res) => {
  const { consumer_id, search_term } = req.body;
  connection.query(
    `INSERT INTO search_history (consumer_id, search_term) values (${consumer_id}, '${search_term}')`,
    (error, results) => {
      if (error) return res.json({ error });
      return res.send("Historial guardado");
    }
  );
});

app.get('/history', (req, res) => {
  connection.query('SELECT * FROM search_history',
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
})

app.post("/views", (req, res) => {
  const { consumer_id, advertisement_id } = req.body;
  connection.query(
    `INSERT INTO ad_views (consumer_id, advertisement_id) values (? ?)`,
    [consumer_id, advertisement_id],
    (error, results) => {
      if (error) return res.json({ error });
      res.send("Anuncio guardado");
    }
  );
});

app.get('/ads/:id', (req, res) => {
  const id = req.params.id;
  const { consumer_id } = req.body;
  connection.query(
    'INSERT INTO ad_views (consumer_id, advertisement_id) values (? ?)',
    [consumer_id, id],
    (error, results) => {
      if (error) return res.json({ error });
      connection.query(
        `SELECT * FROM advertisements WHERE id = ${id}`,
        (error, results) => {
          if (error) return res.json({ error });
          return res.status(200).json(results);
        }
      );
    }
  );
});

app.get('/ads', (req, res) => {
  connection.query(
    'SELECT * FROM advertisements',
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
})

app.get('/views/:consumer_id', (req, res) => {
  const consumer_id = req.params.consumer_id;
  connection.query(
    `SELECT * from ad_views WHERE consumer_id = ${consumer_id}`,
    (error, results) => {
      if (error) return res.json({ error });
      return res.status(200).json(results);
    }
  );
});

app.get('/consumers', (req, res) => {
  connection.query(
    "SELECT * FROM clients WHERE type = 'consumer'",
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
});

app.get('/advertisers', (req, res) => {
  connection.query(
    "SELECT * FROM clients WHERE type = 'advertiser'",
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
});

app.get('/advertisers/:advertiser_id', (req, res) => {
  const advertiser_id = req.params.advertiser_id;
  connection.query(
    `SELECT name FROM clients where id = ${advertiser_id}`,
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
});

app.get('/advertisers/:advertiser_id/ads', (req, res) => {
  const advertiser_id = +req.params.advertiser_id;
  connection.query(
    `SELECT * FROM advertisements where advertiser_id = ${advertiser_id}`,
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
});

app.get('/ads/:id/views', (req, res) => {
  const id = req.params.id;
  connection.query(
    `select count(*) as views from ad_views inner join advertisements on
    ad_views.advertisement_id = advertisements.id where advertisements.id = ${id}`,
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
})

app.get('/history/:consumer_id', (req, res) => {
  const consumer_id = req.params.consumer_id;
  connection.query(
    `SELECT * FROM search_history WHERE consumer_id = ${+consumer_id}`,
    (error, results) => {
      if (error) res.json({ error });
      res.status(200).json(results);
    }
  );
});

app.post('/ads/:advertisement_id/consumers/:consumer_id', (req, res) => {
  const advertisement_id = req.params.advertisement_id;
  const consumer_id = req.params.consumer_id;
  connection.query(
    `INSERT INTO ad_views (consumer_id, advertisement_id) values (${consumer_id}, ${advertisement_id})`,
    (error, results) => {
      if (error) return res.json({ error });
      res.send('OK');
    }
  );
});

const port = +process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});
