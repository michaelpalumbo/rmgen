

// export function to generate entire page
module.exports = userResponses => {
    // get the user responses from the provided object
    const { title, description, installation, usage, license, licenseURL, contributing, tests, username, email, spdx_id } = userResponses;
        
    return `
![](https://img.shields.io/badge/license-${spdx_id}-blue)    
# ${title}

## Table of Contents

[Description](#description)

[Installation](#installation)

[Usage](#usage)

[License](#license)

[Contributing](#contributing)

[Questions](#questions)

### Description
${description}

### Installation
${installation}

### Usage
${usage}

### License
[${license}](${licenseURL})

### Contributing
Access this repository at https://github.com/${username}/${title}
${contributing}

### Questions
[GitHub Profile](https://github.com/${username})

If you have questions about the project, please contact me at ${email}


    `;
  };