
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
  { SkillName: "UI/UX", SkillDescription: "Designing web/app interfaces" },
  { SkillName: "Web Development", SkillDescription: "Developing web applications" },
  { SkillName: "Mobile App Development", SkillDescription: "Building Android/iOS apps" },
];

skillsData.forEach((skill) => {
  db.run(
    "INSERT INTO Skills (SkillName, SkillDescription) VALUES (?, ?)",
    [skill.SkillName, skill.SkillDescription],
    (insertError) => {
      if (insertError) {
        console.error("Error inserting data into skills table: ", insertError);
      } else {
        console.log("Data inserted into skills table");
      }
    }
  );
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
  [edu.Year,edu.Institution],
   (insertError) =>{
    if(insertError){
      console.error("error inserting data inte edu table ")
    } else {
      console.log("Data inserted into edu table")
    }
   });
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


app.get('/about', function(request, response){
  const data ={
    skillsData:skillsData,
    experienceData:experienceData,
    educationData:educationData
  }; 
  response.render('about.handlebars', data);

});




app.get('/login', function(request, response){
  response.render('Login.handlebars', {})
})

/*-------------------------services-tables--------------------*/
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

const{
  webDesignTitle,
  webDesignContent,
  webDesignLink,
  uiUxDesignTitle,
  uiUxDesignConten,
  uiUxDesignLink,
  appDesignTitle,
  appDesignContent,
  appDesignLink,
}=model;



/*-------------------------Wed-Design-tables--------------------*/
db.run(`CREATE TABLE IF NOT EXISTS WebDesign (
  WebdesignID INTEGER PRIMARY KEY,
  Title TEXT NOT NULL,
  Content TEXT NOT NULL,
  Link TEXT NOT NULL
)`);


db.run(
  "INSERT INTO WebDesign(Title,Content,Link) VALUES(?,?,?)",
  [webDesignTitle,webDesignContent,webDesignLink],
  (insertError) => {
    if(insertError){
      console.error("Error inserting data into WebDesign table;",insertError); 
    }else{
      console.log("Data inserted into WebDesign table");
    }
  });




/*-------------------------Web-Design-tables--------------------*/














/*-------------------------services-tables--------------------*/

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
