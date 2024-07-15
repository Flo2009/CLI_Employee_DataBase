const inquirer              = require('inquirer');
inquirer.registerPrompt('search-list', require('inquirer-search-list'));

const taskArray = ['View all Departments', 'View all Roles', 'View all Employees', 'Add a new Department', 'Add a new Role', 
    'Add a new Employee', 'Update an Employee Role', 'Exit'];

module.exports = () => {
    return {
        taskQuestion : () => {
            const question = [
                {
                    name: 'task',
                    type: "list",
                    message: 'What task do you want to perform?',
                    choices: taskArray,
                }
            ]
            return inquirer.prompt(question)
        
        },

        roleQuestion : () => {
            const question = [
                {
                    name: 'role',
                    type: "input",
                    message: 'Enter a Role',
                    default: 'none'
                }
            ]
            return inquirer.prompt(question)
        
        },

        firstNameQuestion: () => {
            const question = [
                {
                    name: 'firstname',
                    type: "input",
                    message: 'Enter the first Name',
                    default: 'Jon'
                }
            ]
            return inquirer.prompt(question)
        
        },

        lastNameQuestion: () => {
            const question = [
                {
                    name: 'lastname',
                    type: "input",
                    message: 'Enter the last Name',
                    default: 'Jon'
                }
            ]
            return inquirer.prompt(question)
        
        },

        depQuestion: () => {
            const question = [
                {
                    name: 'dep',
                    type: "input",
                    message: 'Enter the Department Name',
                    default: 'none'
                }
            ]
            return inquirer.prompt(question)
        
        },

        salaryQuestion: () => {
            const question = [
                {
                    name: 'salary',
                    type: "input",
                    message: 'Enter the Salary',
                    default: 'none'
                }
            ]
            return inquirer.prompt(question)
        
        },

        firstManagerNameQuestion: () => {
            const question = [
                {
                    name: 'firstmanager',
                    type: "input",
                    message: 'Enter the first Name',
                    default: 'Jon'
                }
            ]
            return inquirer.prompt(question)
        
        },

        lastManagerQuestion: () => {
            const question = [
                {
                    name: 'lastmanager',
                    type: "input",
                    message: 'Enter the last Name',
                    default: 'Jon'
                }
            ]
            return inquirer.prompt(question)
        
        },
    }}