const { error } = require('console');
const express = require('express') // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const port = 8081 // defines the port
const app = express() // creates the Express application
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectSqlite3 = require('connect-sqlite3');
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser')
const SQLiteStore = require('connect-sqlite3')(session);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const sqlite3 = require('sqlite3');
const { pid } = require('process');
const db = new sqlite3.Database('portfoliodata.db')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'))

app.use(session({
  store: new SQLiteStore({ db: 'portfoliodata.db'}),
  secret: 'thisissecret',
  saveUninitialized: false,
  resave: false,
}));

/*-------------------------Login-Logout-TABLE--------------------- */

app.get('/login', function (request, response) {
  response.render('Login.handlebars', model)
});

app.post('/login', (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password;

  if (isValidUser(username, password)) {
    req.session.isLoggedIN = true;
    req.session.isAdmin = true;
    req.session.username = username;
    res.redirect('/');

  } else {
    console.log('Wrong username/password, Try again please!')
    req.session.isLoggedIN = false;
    req.session.isAdmin = false;
    req.session.username = "";
    res.redirect('/login');
  }

});

function isValidUser(username, password) {
  return username === 'Qusai22' && password === '223',
    username === 'jerome' && password === 'bäst'
}

app.get('/Logout', (req, res) => {
  req.session.isLoggedIN = false;
  req.session.isAdmin = false;
  req.session.username = "";
  res.redirect('/');
  const model = {}
  res.render('Logout.handlebars', model);
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
)`, error => {
  if (error) {
    console.error("Error creating table")
  } else {
    console.log("experience table created")
  }
});

const experienceData = [
  { Year: "2020", Company: "Scarface Group" },
  { Year: "2021", Company: "Dajjal Interface" },
  { Year: "2022", Company: "Internship at cambridge hell Academy" },
]

experienceData.forEach((exp) => {
  db.run("INSERT INTO Experience (Year,Company) VALUES(?,?)",
    [exp.Year, exp.Company], (insertError) => {
      if (insertError) {
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
  { Year: "2022", Institution: "UI/UX scarface" },
  { Year: "2025", Institution: "MBA at Interface" },
  { Year: "2024", Institution: "BBA at ISM Bangalore" },
]

educationData.forEach((edu) => {
  db.run("INSERT INTO Education(Year,Institution) VALUES(?,?)",
    [edu.Year, edu.Institution],
    (insertError) => {
      if (insertError) {
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



app.get('/', function (request, response) {
  console.log("SESSION:", request.session)
  const data = {
    isLoggedIN: request.session.isLoggedIN,
    name: request.session.username,
    isAdmin: request.session.isAdmin
  };
  response.render('home.handlebars', model)

})


app.get('/about', function (req, response) {
  console.log("SESSION:", req.session)
  const data = {
    skillsData: skillsData,
    experienceData: experienceData,
    educationData: educationData
  };
  response.render('about.handlebars', data);

});

app.get('/contact', function (req, response) {
  console.log("SESSION:", req.session)
  const data = {
    name: 'Your name',
    email: 'Your Email',
    subject: 'Your subject',
    massage: 'Your massage'
  };
  response.render('contact.handlebars', data);

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
  [model.webDesignTitle, model.webDesignContent, model.webDesignLink],
  (insertError) => {
    if (insertError) {
      console.error("Error inserting data into WebDesign table;", insertError);
    } else {
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
  [model.uiUxDesignContent, model.uiUxDesignLink, model.uiUxDesignLink],
  (insertError) => {
    if (insertError) {
      console.error("Error inserting data into UIUXDesign table;", insertError);
    } else {
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
  [model.appDesignTitle, model.appDesignContent, model.appDesignTitle],
  (insertError) => {
    if (insertError) {
      console.error("Error inserting data into UIUXDesign table;", insertError);
    } else {
      console.log("Data inserted into UIUXDesign table");
    }
  });


/*-------------------------services-tables--------------------*/
/*-------------------------portfolio-tables--------------------*/

// Drop the existing "portfolio" table if it exists
db.run(`CREATE TABLE IF NOT EXISTS portfolio (
  pid INTEGER PRIMARY KEY,
  pname TEXT NOT NULL,
  pyear INTEGER NOT NULL,
  pdesc TEXT NOT NULL,
  ptype TEXT NOT NULL,
  pimgURL TEXT NOT NULL
)`);

const portfolio = [
  { "pid": 1, "pname": "Automated Inventory management system", "pyear": 2021, "pdesc": "this project aims to streamline inventory", "ptype": "business", "pimgURL": "/img/inventory.png" },
  { "pid": 2, "pname": "Smart home automation", "pyear": 2022, "pdesc": "this project aims to create a smart home system", "ptype": "technology", "pimgURL": "/img/smart_home.png" },
  { "pid": 3, "pname": "E-learning platform", "pyear": 2022, "pdesc": "this project aims to teach new languages", "ptype": "education", "pimgURL": "/img/language_learning.png" },
  { "pid": 4, "pname": "Medical imaging", "pyear": 2023, "pdesc": "this project focuses on smart medical solutions", "ptype": "business", "pimgURL": "/img/medical_ai.png" },
  { "pid": 5, "pname": "Eco-friendly app", "pyear": 2023, "pdesc": "this project focuses on promoting eco-friendly systems", "ptype": "business", "pimgURL": "/img/ecofriendly_transport.png" }
];


portfolio.forEach((portfolio) => {
  db.run(
    "INSERT INTO portfolio (pname, pyear, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?, ?)",
    [portfolio.pname, portfolio.pyear, portfolio.pdesc, portfolio.ptype, portfolio.pimgURL],
    (insertError) => {
      if (insertError) {
        console.error("Error inserting data into portfolio table:", insertError);
      } else {
        console.log("Data inserted into portfolio table");
      }
    }
  );
});






/*-------------------------portfolio-tables--------------------*/



app.get('/services', function (req, response) {
  console.log("SESSION:", req.session)
  const data = {
    skillsData: skillsData,
    experienceData: experienceData,
    educationData: educationData
  };
  response.render('services.handlebars', model);

});

app.get('/portfolio', (req, res) => {
  db.all("SELECT * FROM portfolio", function (error, portfolio) {
    if (error) {
      console.error("Error fetching portfolio data:", error);
      // Handle the error and render an appropriate view
      const model = {
        dbError: true,
        theError: error,
        portfolio: [],
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.username,
        isAdmin: req.session.isAdmin,
      };
      res.render('portfolio.handlebars', model);
    } else {
      const model = {
        dbError: false,
        theError: "",
        portfolio: portfolio,
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.username,
        isAdmin: req.session.isAdmin,
      };
      res.render('portfolio.handlebars', model);
    }
  });
});

// Handle displaying the "Add New Portfolio Entry" form
app.get('/portfolio/new', (req, res) => {
  if (req.session.isLoggedIn && req.session.isAdmin == true) {
    const model = {
      isLoggedIn: req.session.isLoggedIn,
      name: req.session.username,
      isAdmin: req.session.isAdmin,
    };
    res.render('portfolio-new.handlebars', model);
  } else {
    res.redirect('/login');
  }
});

// Handle form submission to add a new portfolio entry
app.post('/portfolio/new', (req, res) => {
  const { pname, pyear, pdesc, ptype, pimgURL } = req.body;
  if (req.session.isLoggedIn && req.session.isAdmin) {
    db.run(
      'INSERT INTO portfolio (pname, pyear, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?, ?)',
      [pname, parseInt(pyear), pdesc, ptype, pimgURL],  // Ensure pyear is parsed as an integer
      function (error) {
        if (error) {
          console.error("Error inserting data into portfolio table: ", error);
          // Handle the error and render an appropriate view
          const model = {
            dbError: true,
            theError: error,
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.username,
            isAdmin: req.session.isAdmin,
          };
          res.render('portfolio-new.handlebars', model);
        } else {
          res.redirect('/portfolio');
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});


// Handle editing a portfolio entry
app.get('/portfolio/edit/:id', (req, res) => {
  const portfolioID = req.params.id;
  if (req.session.isLoggedIn && req.session.isAdmin) {
    db.get("SELECT * FROM portfolio WHERE pid=?", [portfolioID], (error, row) => {
      if (error) {
        console.error('Error fetching post:', error);
        res.redirect('/portfolio');
      } else {
        const model = {
          id: portfolioID,
          post: row,
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.username,
          isAdmin: req.session.isAdmin,
        };
        res.render('portfolio-edit.handlebars', model);
      }
    });
  } else {
    res.redirect('/login');
  }
});

// Handle updating a portfolio entry
app.post('/portfolio/edit/:id', (req, res) => {
  const portfolioID = req.params.id;
  const { pname, pyear, pdesc, ptype, pimgURL } = req.body;
  if (req.session.isLoggedIn && req.session.isAdmin) {
    db.run(
      'UPDATE portfolio SET pname = ?, pyear = ?, pdesc = ?, ptype = ?, pimgURL = ? WHERE pid = ?',
      [pname, pyear, pdesc, ptype, pimgURL, portfolioID],
      (error) => {
        if (error) {
          console.error('Error updating post:', error);
          res.redirect('/portfolio');
        } else {
          res.redirect('/portfolio');
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});

// Handle deleting a portfolio entry
app.get('/portfolio/delete/:id', (req, res) => {
  const portfolioID = req.params.id;
  if (req.session.isLoggedIn && req.session.isAdmin) {
    db.run("DELETE FROM portfolio WHERE pid=?", [portfolioID], (error) => {
      if (error) {
        const model = {
          dbError: true,
          theError: error,
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.username,
          isAdmin: req.session.isAdmin,
        };
        res.redirect("/portfolio"); // Redirect to the correct route
      } else {
        const model = {
          dbError: false,
          theError: "",
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.username,
          isAdmin: req.session.isAdmin,
        };
        res.redirect('/portfolio'); // Redirect to the correct route
      }
    });
  } else {
    res.redirect('/login');
  }
});

/*db.run('DROP TABLE IF EXISTS portfolio', (dropError) => {
  if (dropError) {
      console.error('Error dropping portfolio table:', dropError);
  } else {
      console.log('Dropped portfolio table');
      
      // Create the "portfolio" table with the specified columns
      db.run(`CREATE TABLE portfolio (
          pid INTEGER PRIMARY KEY AUTOINCREMENT,
          pname TEXT NOT NULL,
          pyear INTEGER NOT NULL,
          pdesc TEXT NOT NULL,
          ptype TEXT NOT NULL,
          pimgURL TEXT NOT NULL
      )`, (createError) => {
          if (createError) {
              console.error('Error creating portfolio table:', createError);
          } else {
              console.log('Created portfolio table');
          }
      });
  }
});*/
/*---------------gjort-----------------*/


/* portfolio.forEach((oneProject) => {
   db.run(
     "INSERT INTO portfolio(pname,pyear,pdesc,ptype,pimgURL) VALUES(?,?,?,?,?)", [oneProject.name,
     oneProject.year, oneProject.desc, oneProject.type, oneProject.url], (error) => {
       if (error) {
         const model = {
           dbError:true,
           theError:error,
           isLoggedIn: req.session.isLoggedIn,
           name:req.session.username,
           isAdmin:req.session.isAdmin,
         };
         console.log("ERROR: ", error)
       } else {

         console.log("Line added into the portfolio table!")
         res.redirect('/portfolio');
       }
     });
   } else{
     res.redirect('/login');
   
 
}
});
*/

/*//////////////////////*/
app.use(function (req, res) {
  res.status(404).render('404.handlebars');
});

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}...`)
})

app.get('/login', function (req, response) {
  response.render('Login.handlebars');
})

