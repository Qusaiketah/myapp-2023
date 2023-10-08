
const { error } = require('console');
const express = require('express') // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const port = 8081 // defines the port
const app = express() // creates the Express application
const session = require ('express-session')
const connectSqlite3 = require ('connect-sqlite3')(session)
const cookieParser = require ('cookie-parser')

const SQLiteStore = connectSqlite3(session)

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('projects-jl3.db')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'))

/*-------------------------Login-Logout-TABLE--------------------- */

app.get('/login', function(request, response){
  response.render('Login.handlebars',model)
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if ( username === 'your_username' && password === 'your_password'){
    req.session.isAdmin=true;
    req.session.isLoggedIN = true;
    req.session.username = username;
    res.redirect ('/');

  } else {
    console.log('Wrong username/password, Try again please!')
    req.session.isLoggedIN = false;
    req.session.isAdmin=false;
    req.session.username = "";
    res.redirect ('/Login');
  }

});


app.get('Logout',(req,res)=>{
  req.session.isLoggedIN = false;
    req.session.isAdmin=false;
    req.session.username = "";
    res.redirect('/');
    const model = {}
    res.render('Logout.handlebars',model);
  });












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




/*-------------------------EDUCATION-TABLE--------------------- */

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



/*-------------------------services-tables--------------------*/

/*-------------------------Wed-Design-tables--------------------*/
db.run(`CREATE TABLE IF NOT EXISTS WebDesign (
  WebdesignID INTEGER PRIMARY KEY,
  Title TEXT NOT NULL,
  Content TEXT NOT NULL,
  Link TEXT NOT NULL
)`);


db.run(
  "INSERT INTO WebDesign(Title,Content,Link) VALUES(?,?,?)",
  [model.webDesignTitle,model.webDesignContent,model.webDesignLink],
  (insertError) => {
    if(insertError){
      console.error("Error inserting data into WebDesign table;",insertError); 
    }else{
      console.log("Data inserted into WebDesign table");
    }
  });




/*-------------------------UI/UX-Design-tables--------------------*/

db.run(`CREATE TABLE IF NOT EXISTS UIUXDesign (
  UIUXdesignID INTEGER PRIMARY KEY,
  Title TEXT NOT NULL,
  Content TEXT NOT NULL,
  Link TEXT NOT NULL
)`);

db.run(
  "INSERT INTO UIUXDesign(Title,Content,Link) VALUES(?,?,?)",
  [model.uiUxDesignContent,model.uiUxDesignLink,model.uiUxDesignLink],
  (insertError) => {
    if(insertError){
      console.error("Error inserting data into UIUXDesign table;",insertError); 
    }else{
      console.log("Data inserted into UIUXDesign table");
    }
  });

/*-------------------------App-Design-tables--------------------*/


db.run(`CREATE TABLE IF NOT EXISTS AppDesign (
  UIUXdesignID INTEGER PRIMARY KEY,
  Title TEXT NOT NULL,
  Content TEXT NOT NULL,
  Link TEXT NOT NULL
)`);

db.run(
  "INSERT INTO AppDesign(Title,Content,Link) VALUES(?,?,?)",
  [model.appDesignTitle,model.appDesignContent,model.appDesignTitle],
  (insertError) => {
    if(insertError){
      console.error("Error inserting data into UIUXDesign table;",insertError); 
    }else{
      console.log("Data inserted into UIUXDesign table");
    }
  });


/*-------------------------services-tables--------------------*/
/*-------------------------portfolio-tables--------------------*/

db.run(`CREATE TABLE IF NOT EXISTS portfolio (
  pid INTEGER PRIMARY KEY,
  pname TEXT NOT NULL,
  pyear INTEGER NOT NULL,
  pdesc TEXT NOT NULL,
  ptype TEXT NOT NULL,
  pimgURL TEXT NOT NULL
)`);

const portfolio = [
  {"pid":"1","name":"Automated Inventory management system","type":"business","desc":"this project aims to streamline inventory","year":2021, "dev":"Node.js","url":"/img/inventory.png" },
  {"pid":"2","name":"Smart home automation","type":"technology","desc":"this project aims create smart home system","year":2022, "dev":"Node.js","url":"/img/smart_home.png" },
  {"pid":"3","name":"E-learning platform","type":"education","desc":"this project aims teach new languages","year":2022, "dev":"Node.js","url":"/img/language_learning.png" },
  {"pid":"4","name":"Medical imaging","type":"business","desc":"this project focusing on smart medical solutions","year":2023, "dev":"Node.js","url":"/img/medical_ai.png" },
  {"pid":"5","name":"Eco-friendly app","type":"business","desc":"this project focuses on promoting eco friendly systems","year":2023, "dev":"Node.js","url":"/img/ecofriendly_transport.png" },

];


portfolio.forEach( (oneProject) => {
db.run(
  "INSERT INTO portfolio(pname,pyear,pdesc,ptype,pimgURL) VALUES(?,?,?,?,?)",[oneProject.name,
    oneProject.year, oneProject.desc, oneProject.type, oneProject.url], (error) => {
    if (error) {
    console.log("ERROR: ", error)
    } else {
    console.log("Line added into the portfolio table!")
  }
});
});

/*-------------------------portfolio-tables--------------------*/





app.get('/services', function(request, response){
  response.render('services.handlebars', model);
  
  });
  





  app.get('/portfolio', function(request, response){
    db.all("SELECT * FROM portfolio", (error, portfolioData) => {
      if (error) {
        response.render('portfolio.handlebars', { dbError: true, theError: error.message });
      } else {
        response.render('portfolio.handlebars', { dbError: false, portfolio: portfolioData });
      }
    });
  });
  

app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
})

app.get('/login', function(request, response){
  response.render('Login.handlebars'); 
})
