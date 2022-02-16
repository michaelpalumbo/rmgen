const fs = require ('fs')
const makeReadme = require('./src/readme-generator.js')
// const getLicenses = require('./src/licenses.js')
const contents = {}
const inquirer = require('inquirer');
const fetch = require('node-fetch');
// prompt user for their software project details
const promptUser = (licenses) => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
              return true;
            } else {
              console.log('Error: Missing a title for your project');
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please describe your project',
        validate: desc => {
            if (desc) {
              return true;
            } else {
              console.log('Error: Missing project description');
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How to install your project',
        validate: install => {
            if (install) {
              return true;
            } else {
              console.log('Error: Missing installation instructions');
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Describe how to use your project',
        validate: use => {
            if (use) {
              return true;
            } else {
              console.log('Error: Missing usage instructions');
              return false;
            }
        }
    },
    {
        type: 'list',
        message: 'Choose a License',
        name: 'license',
        choices: licenses
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter contribution guidelines',
        validate: contribute => {
            if (contribute) {
              return true;
            } else {
              console.log('Error: Missing contribution guidelines');
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
        validate: install => {
            if (install) {
              return true;
            } else {
              console.log('Error: Missing email address');
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is your github username?',
        validate: username => {
            if (username) {
              return true;
            } else {
              console.log('Error: Missing username');
              return false;
            }
        }
    },

  ])

}
// objects to store software license data fetched from GitHub API
let licenseNames = {}
let licenses = []
let licenseURLs = {}
// get licenses 
fetch("https://api.github.com/licenses")
    .then(res => res.text())
    .then(text => {
        let res = JSON.parse(text)
        
        // iterate and create an array of choices for the licenses option
        for(i=0;i<res.length;i++){
            licenses.push(res[i].name)
            licenseNames[res[i].name] = res[i].spdx_id
            licenseURLs[res[i].name] = res[i].url
        }
    })
    // prompt the user for details about their software project, passing license options
    .then(promptUser(licenses)
    .then(answers => {   
        let license =  answers.license
        answers.spdx_id = licenseNames[license].replace('-', '_')
        answers.licenseURL = licenseURLs[license]
        // create the readme.md
        fs.writeFile('./output/README.md', makeReadme(answers), err => {
            if (err) throw new Error(err);
            console.log('README.md completed');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        } else {
        // Something else went wrong
        }
    }) 
)
    