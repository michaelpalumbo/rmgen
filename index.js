const fs = require ('fs')
const makeReadme = require('./src/readme-generator.js')
const contents = {}
const inquirer = require('inquirer');

inquirer
  .prompt([
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
        validate: desc => {
            if (desc) {
              return true;
            } else {
              console.log('Error: Missing installation instructions');
              return false;
            }
        }
    },


  ])
  .then((answers) => {
    if(answers.title){
        contents.title = answers.title
    }
    if(answers.description){
        contents.description = answers.description
    }

    fs.writeFile('./README.md', makeReadme(answers), err => {
        if (err) throw new Error(err);
      
        console.log('Portfolio complete! Check out index.html to see the output!');
      });
    // Use user feedback for... whatever!!
    // fs.writeFile('README.md', )

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
