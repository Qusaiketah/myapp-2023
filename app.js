
const { error } = require('console');
const express = require('express') // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const port = 8081 // defines the port
const app = express() // creates the Express application

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('projects-jl3.db')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'))

/*-------------------------SKILLS-TABLE--------------------- */

db.run(`CREATE TABLE IF NOT EXISTS Skills (
    SkillID INTEGER PRIMARY KEY,
    SkillName TEXT NOT NULL,
    SkillDescription TEXT NOT NULL
)`);

const skillsData = [
    {SkillName:"UI/UX", SkillDescription:"Designing web/app interfaces"}, 
    {SkillName:"UI/UX", SkillDescription:"Designing web/app interfaces"}, 
    {SkillName:"UI/UX", SkillDescription:"Designing web/app interfaces"}, 
]

skillsData.forEach((skill) => {
  db.run("INSERT INTO Skills (SkillName,SkillDescription) VALUES(?,?)",
         [skill.SkillName,skill.SkillDescription]);
  });

/*-------------------------SKILLS-TABLE--------------------- */



/*-------------------------EXPERIENCE-TABLE--------------------- */
db.run(`CREATE TABLE IF NOT EXISTS Experience (
  ExperienceID INTEGER PRIMARY KEY,
  Year TEXT NOT NULL,
  Company TEXT NOT NULL
)`, error =>{
  if(error){
    console.error("Error creating table")
  } else{
  console.log("experience table created")}
});

const experienceData = [
  {Year:"2020", Company:"Scarface Group"}, 
  {Year:"2021", Company:"Dajjal Interface"}, 
  {Year:"2022", Company:"Internship at cambridge hell Academy"}, 
]

experienceData.forEach((exp) => {
db.run("INSERT INTO Experience (Year,Company) VALUES(?,?)",
       [exp.Year,exp.Company], (insertError) =>{
        if(insertError){
          console.error("error inserting data inte exp table ")
        } else {
          console.log("Data inserted into exp table")
        }
       }
       
       
       );
});


/*-------------------------EXPERIENCE-TABLE--------------------- */
/*-------------------------EDUCATION-TABLE--------------------- */
db.run(`CREATE TABLE IF NOT EXISTS Education (
  EducationID INTEGER PRIMARY KEY,
  Year TEXT NOT NULL,
  Institution TEXT NOT NULL
)`);

const educationData = [
  {Year:"2022", Institution:"UI/UX scarface"}, 
  {Year:"2025", Institution:"MBA at Interface"}, 
  {Year:"2024", Institution:"BBA at ISM Bangalore"}, 
]

educationData.forEach((edu)=>{
  db.run("INSERT INTO Education(Year,Institution) VALUES(?,?)", 
  [exp.Year,exp.Institution]);
});

db.close((error)=>{
  if(error){
    return console.error(error.massage);
  } console.log('Database connection closed')
});







/*-------------------------EDUCATION-TABLE--------------------- */

app.get('/', function(request, response){
  response.render('home.handlebars')
})


/*app.get('/about', function(request, response){
  const model = {
    skills: [
      {"title": "UI/UX", "description": "Designing web/app interfaces"},
      {"title": "Web Development", "description": "Web/app Development"},
      {"title": "Mobile App Development", "description": "Building Android/iOS apps"}
    ],
    experience: [
      {"year": "2020", "company": "Scarface Group"},
      {"year": "2021", "company": "Dajjal Interface"},
      {"year": "2022", "company": "Internship at Hell Academy"}
    ],
    education: [
      {"year": "2022", "institution": "UI/UX at Scarface Group"},
      {"year": "2025", "institution": "MBA at Interface"},
      {"year": "2024", "institution": "BBA at ISM Bangalore"}
    ]
  };
  response.render('about.handlebars', model);
});

*/

app.get('/login', function(request, response){
  const model = humans[1] 
  response.render('Login.handlebars', {})
})


app.get('/services', function(request, response){
  const model = {
    webDesignTitle: "Web-Design",
    webDesignContent: "Web design refers to the craft of giving a website a basic graphic design that is usually guided by markup language. This includes determining the sizes and placement of surfaces, typography, color scales, manner or style of images, icons, logos and other graphic elements...",
    webDesignLink: "https://sv.wikipedia.org/wiki/Webbdesign",
    uiUxDesignTitle: "UI/UX Design",
    uiUxDesignContent: "User interface (UI) design or user interface engineering is the design of user interfaces for machines and software, such as computers, home appliances, mobile devices, and other electronic devices, with the focus on maximizing usability and the user experience...",
    uiUxDesignLink: "https://en.wikipedia.org/wiki/User_interface_design",
    appDesignTitle: "App Design",
    appDesignContent: "Mobile app development is the act or process by which a mobile app is developed for one or more mobile devices, which can include personal digital assistants (PDA), enterprise digital assistants (EDA), or mobile phones.[1] Such software applications are specifically designed to run on mobile devices, taking numerous hardware constraints into consideration...",
    appDesignLink: "https://en.wikipedia.org/wiki/Mobile_app_development"
  };
  response.render('services.handlebars', model);
});


app.get('/portfolio', function(request, response){
  response.render('portfolio.handlebars')
})


app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
})

app.get('/login', function(request, response){
  response.render('Login.handlebars'); 
})
