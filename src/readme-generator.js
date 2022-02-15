

// export function to generate entire page
module.exports = userResponses => {
    // get the user responses from the provided object
    const { title, description } = userResponses;
        
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

### Usage

### License

### Contributing

### Tests

### Questions

    `;
  };