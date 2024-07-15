const router = require('express').Router();
const pool = require('../../config/connection');
//get all employees with role, salary, department, manager
router.get('/', (req, res) => {
    const sql = `
  SELECT
    e.first_name || ' ' || e.last_name employee, 
    m.first_name || ' ' || m.last_name manager,
    r.title, r.salary, d.dep_name
    
    FROM 
    employee e 
    LEFT JOIN employee m ON m.id = e.manager_id
    LEFT JOIN role_table r ON e.role_id = r.id
    Left JOIN departments d ON r.department_id = d.id
  `; 

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
//add employee
  router.post('/', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ($1, $2, $3, $4)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  
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
//Update role of employee
  router.put('/:first_name/:last_name', (req, res) => {
    const sql = `UPDATE employee SET role_id = $1 WHERE first_name = $2 AND last_name = $3`;
    const params = [req.body.role_id, req.params.first_name, req.params.last_name];
  
    pool.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.rowCount) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          data: req.body,
          changes: result.rowCount
        });
      }
    });
  });

  router.get('/:first_name/:last_name', (req, res) => {
    
    const sql = `SELECT id FROM employee WHERE first_name = $1 AND last_name = $2`;
    // console.log(sql);
    const params = [req.params.first_name, req.params.last_name];
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



