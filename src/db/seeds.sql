INSERT INTO departments (dep_name)
VALUES  ('HR'),
        ('Finance'),
        ('Controlling'),
        ('Engineering'),
        ('Facility'),
        ('Sales'),
        ('PlantLeader');

INSERT INTO role_table (title, salary, department_id)
VALUES  ('Generalist', 45000, 1),
        ('Specialist', 30000, 1),
        ('HR_Director', 100000, 1),
        ('Accountant_Incoming', 50000, 2),
        ('Accountant_Outgoing', 50000, 2),
        ('Finance_Director', 110000, 2),
        ('Design_Engineer', 105000, 4),
        ('Controls_Engineer', 115000, 4),
        ('Engineering_Manager', 120000, 4),
        ('Facility_Tech', 55000, 5),
        ('Facility_Supervisor', 90000, 5),
        ('Sales_Inside', 75000, 6),
        ('Sales_Outside', 85000, 6),
        ('Sales_Director', 120000, 6),
        ('Plant_Manager', 200000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Gabriella', 'Sanchez', 1, 2),
        ('Sudden', 'Smith', 3, 5),
        ('Katlyn', 'Miller', 5, 4),
        ('Bert', 'Strong', 6, 5),
        ('Jimmy', 'Page',15, Null);
