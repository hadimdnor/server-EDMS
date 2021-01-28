const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const run_sql = require('./db')
const pg = require('pg');
const port = process.env.PORT || 3001;


const origin = process.env.PRODUCTION ? "http://edms.surge.sh/" : "http://localhost:3000"

app.use(cors({ origin }));
app.use(express.json());



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





const { Pool, Client } = require("pg");

let pool;
if (process.env.PRODUCTION) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
} else {
  pool = new Pool({
    database: 'employee_management',
    user: 'hadimdnor'
  })
}

// app.post('/register', (req,res) => {
//   const username = req.body.username
//   const email = req.body.email
//   const password = req.body.password
//   bcrypt.hash(password, saltRounds, (err, hash) => {
//     if(err){
//       console.log(err)
//     }
//       pool.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3)',[username, email, hash],(err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send("registartion happen");
//         }
//       }
//     );
//   })
// })

// app.post('/login', (req,res) => {
//   const username = req.body.username
//   const email = req.body.email
//   const password_digest = req.body.password
//   // const password_digest = generateHash(password)
//   console.log(req.body)
//   pool.query('SELECT * FROM users WHERE email = $1 AND   password_digest = $2',[email, password_digest],(err, result) => {
//     console.log(result)
//       if (err) {
//         res.send({err: err});
//       } 

//       if(result.length > 0){
//         res.send({message: "user does not exist"})
        
//       }else{
//         res.send(result)
//       ;
//       }
//     }
//   );
// })




app.post("/create", (req, res) => {
  const name = req.body.name
  const staff_id = req.body.staff_id
  const age = req.body.age
  const email = req.body.email
  const position = req.body.position
  const department = req.body.department
  const wage = req.body.wage
 
pool.query('INSERT INTO employees(name, staff_id,age, email, position, department, wage) VALUES($1, $2, $3, $4, $5, $6, $7)',[name, staff_id, age, email, position, department, wage],(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req,res) => {
  pool.query("SELECT * FROM employees", (err, result) => {
    if(err) {
      console.log(err)
    }else {
      res.send(result)
    }
  })
})

app.put("/update", (req,res)=>{
  const id = req.body.id
  const wage = req.body.wage
  console.log(wage)
  pool.query("UPDATE employees SET wage = $1 WHERE id = $2",[wage, id],(err,result) => {
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

app.delete("/delete/:id", (req, res)=> {
  const id = req.params.id
  pool.query("DELETE FROM employees WHERE id = $1", [id], (err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

// app.delete()

// app.use(run_sql)
// app.use(userRoutes)
// app.use(sessionRoutes)

app.listen(port, () => {
  console.log(`Yey, your server is running on port ${port}`);
});