const router = require('express').Router();
const pool = require('../../config/connection');


router.get('/', (req, res) => {
    const sql = `SELECT * FROM departments`;
  
    pool.query(sql, (err, { rows }) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        data: rows
      });
    });
  });

  router.post('/', ({ body }, res) => {
    const sql = `INSERT INTO departments (dep_name)
      VALUES ($1)`;
    const params = [body.dep_name];
    console.log(body);
    pool.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        data: body
      });
    });
  });

  router.get('/:name', (req, res) => {
    
    const sql = `SELECT id FROM departments WHERE dep_name = $1`;
    // console.log(sql);
    const params = [req.params.name];
    pool.query(sql, params,(err, { rows }) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        data: rows
      });
    });
  });

module.exports = router;