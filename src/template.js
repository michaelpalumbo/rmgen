// create the about section
const generateTitle = title => {
    if (!aboutText) {
      return '';
    }
  
    return `
        #${title}
    `;
  };