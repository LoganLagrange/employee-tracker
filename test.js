const inquirer = require(`inquirer`);

inquirer
  .prompt([
    {
      type: 'input',
      name: 'test',
      message: 'Enter something:'
    }
  ])
  .then((answers) => {
    console.log('Answers:', answers);
  })
  .catch((error) => {
    console.error('Error:', error);
  });