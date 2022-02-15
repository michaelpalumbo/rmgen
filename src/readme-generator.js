

// export function to generate entire page
module.exports = userResponses => {
    // get the user responses from the provided object
    const { title, description, installation, usage, license, contributing, tests, username, email } = userResponses;
        
    return `
# ${title}

## Table of Contents
1. Description
2. Installation
3. Usage
4. License
5. Contributing
6. Tests
7. Questions

### Description
${description}

### Installation
${installation}

### Usage
${usage}

### License
${license}

### Contributing
Access this repository at https://github.com/${username}/${title}
${contributing}

### Tests
${tests}

### Questions
If you have questions about the project, please contact me at ${email}


    `;
  };