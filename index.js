const fs = require ('fs')
const makeReadme = require('./src/readme-generator.js')
// const getLicenses = require('./src/licenses.js')
const contents = {}
const inquirer = require('inquirer');
const fetch = require('node-fetch');

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
              console.log('Error: Missing a title for your project');
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
        message: 'describe how to use your project',
        validate: use => {
            if (use) {
              return true;
            } else {
              console.log('Error: Missing installation instructions');
              return false;
            }
        }
    },
    {
        type: 'checkbox',
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
        name: 'questions',
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
let licenseNames = {}
let licenses = []
fetch("https://api.github.com/licenses")
    .then(res => res.text())
    .then(text => {
        let res = JSON.parse(text)
        
        // iterate and create an array of choices for the licenses option
        for(i=0;i<res.length;i++){
            licenses.push({name: res[i].name})
            licenseNames[res[i].name] = res[i].spdx_id
        }
        // console.log(licenses)
    })
    .then(promptUser(licenses))
    .then(answers => {

        console.log('me;', answers)

        fs.writeFile('./README.md', makeReadme(answers), err => {
            if (err) throw new Error(err);
        
            console.log('Portfolio complete! Check out index.html to see the output!');
        });

    })
    .catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        } else {
        // Something else went wrong
        }
    });



    // promptUser()
    // .then(promptProject)
    // .then(portfolioData => {
    //   return generatePage(portfolioData);
    // })