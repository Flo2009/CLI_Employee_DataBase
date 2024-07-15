const { response } = require('express');
const inquirer = require('inquirer');

const questions = require('./questions')();

const init = async function (){
    let task={};
    
        task = await questions.taskQuestion();
        console.log(task.task);
        switch (task.task){
            case 'View all Departments':
                depSearch();
                break;
            case 'View all Roles': 
                roleSearch();
                break;
            case 'View all Employees':
                employeeSearch();
                break;
            case 'Add a new Department':
                const   depName   = await questions.depQuestion();
                // console.log(depName.dep);
                if (depName.dep || isNaN(depName.dep) === true){
                    depUpdate(depName.dep);
                    break;
                }else{
                    console.log('Enter a new Deaprtment!');
                    break;
                }
            case 'Add a new Role':
                const role = await questions.roleQuestion();
                const dep = await questions.depQuestion();
                const salary = await questions.salaryQuestion();

                role.dep = dep.dep;
                role.salary = parseInt(salary.salary);
                let depId = await depSearchbyName(role.dep);
                depId = parseInt (depId);
                if (role.role || isNaN(role.role) === true){
                    // console.log(role);
                    roleAdder(role.role, role.salary, depId);
                    break;
                }else{
                    console.log('Enter a new Role!');
                    break;
                }
            case 'Add a new Employee':
                const firstName = await questions.firstNameQuestion();
                const lastName = await questions.lastNameQuestion();
                const roleEmpl = await questions.roleQuestion();
                const firstMan = await questions.firstManagerNameQuestion();
                const lastMan = await questions.lastManagerQuestion();
                // console.log(roleEmpl);
                let roleID = await roleIdSearchbyName(roleEmpl.role);
                roleID = parseInt(roleID);
                let managerId = await managerIdSearchByName(firstMan.firstmanager, lastMan.lastmanager);
                managerId = parseInt(managerId);
                employeeAdder(firstName.firstname, lastName.lastname, roleID, managerId);
            case 'Update an Employee Role':
                const fName = await questions.firstNameQuestion();
                const lName = await questions.lastNameQuestion();
                const newEmpRole = await questions.roleQuestion();

                let roleId = await roleIdSearchbyName(newEmpRole.role);
                roleId = parseInt(roleId);
                updateEmployeeRole(fName.firstname, lName.lastname, roleId);
        }
    }
//   Queries to the db over the server

//Show the departments in Table
const depSearch = async function(){
    const depLink = 'http://localhost:3001/api/departments';
    fetch(depLink)
        .then(response => response.json())
            // console.log(response);
        .then(data => {
          console.table(data.data);
          
        })
        .catch(error => console.error('Error:', error));
}

const depSearchbyName = async function(depName){
    const depLink = `http://localhost:3001/api/departments/${depName}`;
    console.log(depLink);
    try{
        const res = await fetch(depLink);
        const data = await (res.json());
        const val = (data.data[0].id);
        // console.log(val);
        return new Promise((res, rej) => {
            res(val);
        });
    } catch(error){console.error('Error:', error)}};
    
//Show the roles in Table
const roleSearch = async function(){
    const roleLink = 'http://localhost:3001/api/roles';
    fetch(roleLink)
        .then(response => response.json())
            // console.log(response);
        .then(data => {
          console.table(data.data);
          
        })
        .catch(error => console.error('Error:', error));
}
// Search role ID by role name
const roleIdSearchbyName = async function(roleName){
    const roleLink = `http://localhost:3001/api/roles/${roleName}`;
    // console.log(roleLink);
    try{
        const res = await fetch(roleLink);
        const data = await (res.json());
        const val = (data.data[0].id);
        // console.log(val);
        return new Promise((res, rej) => {
            res(val);
        });
    } catch(error){console.error('Error:', error)}};

//Show the Employees in Table
const employeeSearch = async function(){
    const employeeLink = 'http://localhost:3001/api/employees';
    fetch(employeeLink)
        .then(response => response.json())
            // console.log(response);
        .then(data => {
          console.table(data.data);
          
        })
        .catch(error => console.error('Error:', error));
}
//get the Id from an employee as manager ID from First and Last Name
const managerIdSearchByName = async function(firstName, lastName){
    const managerLink = `http://localhost:3001/api/employees/${firstName}/${lastName}`;
    // console.log(managerLink);
    try{
        const res = await fetch(managerLink);
        // console.log(res);
        const data = await (res.json());
        const val = (data.data[0].id);
        console.log(data);
        return new Promise((res, rej) => {
            res(val);
        });
    } catch(error){console.error('Error:', error)}
}

const updateEmployeeRole = async function(firstName, lastName, roleId){
    const insert = {
        role_id : roleId
    };
    console.log(insert);
    const depLink = `http://localhost:3001/api/employees/${firstName}/${lastName}`;
    fetch(depLink, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(insert)
        }).then(res => {
        //return the response as JSON
           return res.json();
          })
          //extract the data with the token and the expire time and parse it to the function
          .then(function(data){
            console.log(data);
            });
}
//Add Department
const depUpdate = async function(newDep) {
    // console.log(newDep);
    const insert = {
        dep_name : newDep
    };
    // console.log(insert);
    const depLink = 'http://localhost:3001/api/departments';
    fetch(depLink, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'},
  body: JSON.stringify(insert)
    }).then(res => {
    //return the response as JSON
       return res.json();
      })
      //extract the data with the token and the expire time and parse it to the function
      .then(function(data){
        console.log(data);
        });
    }
// Adds the Roles
const roleAdder = async function(newRole, salary, dep) {
    // console.log(newRole);
    const insert = {
        title : newRole,
        salary : salary,
        department_id : dep
    };
    console.log(insert);
    const depLink = 'http://localhost:3001/api/roles';
    fetch(depLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(insert)
        }).then(res => {
        //return the response as JSON
           return res.json();
          })
          //extract the data with the token and the expire time and parse it to the function
          .then(function(data){
            console.log(data);
            });
        }

// Adds the Roles
const employeeAdder = async function(firstName, lastName, roleId, managerId) {
    // console.log(newRole);
    const insert = {
        first_name : firstName,
        last_name : lastName,
        role_id : roleId,
        manager_id : managerId
    };
    console.log(insert);
    const depLink = 'http://localhost:3001/api/employees';
    fetch(depLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(insert)
        }).then(res => {
        //return the response as JSON
           return res.json();
          })
          //extract the data with the token and the expire time and parse it to the function
          .then(function(data){
            // console.log(data);
            });
        }

// Function call to initialize app
init();