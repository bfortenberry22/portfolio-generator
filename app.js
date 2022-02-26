const inquirer = require('inquirer');

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?', 
            validate: nameInput => {
                if (nameInput){
                    return true;
                } else{
                    console.log('Please enter your name!');
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username:', 
            validate: githubInput =>{
                if(githubInput){
                    return true;
                }else {
                    console.log('Enter your GitHub Username!');
                    return false;
                }
            }
        }, 
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:', 
            
        }
    ]);
};


const promptProject = portfolioData =>{
    //If there's no 'projects' array, create one
    if(!portfolioData.projects){
        portfolioData.projects = [];
    };
    console.log(`
    ================
    ADD NEW PROJECT
    ================`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput){
                    return true;
                } else{
                    console.log('Please enter the name of your project!');
                    return false;
                }
            }
        
        }, 
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (required).',
            validate: descriptionInput => {
                if (descriptionInput){
                    return true;
                } else{
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Provide a link to the project (required).',
            validate: linkInput => {
                if (linkInput){
                    return true;
                } else{
                    console.log('Please enter a link to your project!');
                    return false;
                }
            }
        },
        {
            type:'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        }, 
        {
            type: 'confirm',
            name: 'confrimAddProject',
            message: 'Would you like to add another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });
