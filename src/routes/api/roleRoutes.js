const router = require('express').Router();
const pool = require('../../config/connection');

router.get('/', (req, res) => {
    const sql = `SELECT * FROM role_table JOIN departments ON role_table.department_id = departments.id`
  
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
    const sql = `INSERT INTO role_table (title, salary, department_id)
      VALUES ($1, $2, $3)`;
    const params = [body.title, body.salary, body.department_id];
  
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

router.get('/:title', (req, res) => {
    
    const sql = `SELECT id FROM role_table WHERE title = $1`;
    // console.log(sql);
    const params = [req.params.title];
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