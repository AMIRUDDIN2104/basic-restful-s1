const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let dbUsers = [
  {
      username: "amir",
      password: "password",
      name: "amiruddin",
      email: "muhammadamiruddinmuhamad@gmail.com"
  },
  {
      username: "zikry",
      password: "123",
      name: "zikey",
      email: "zikryruddin@utem.edu.my"
  },
]


app.get('/bye', (req, res) => {
    res.send('Bye Bye World!')
})

//Eenable json body parsing
app.use(express.json());

app.post('/', (req, res) => {
  let data = req.body
  res.send(
    login(
        data.username,
        data.password
    )
  );
});

function login(username, password) {
  console.log("someone try to login with", username, password)
  let matched = dbUsers.find(element => 
      element.username == username
  )
  if(matched){
      if(matched.password == password) {
          return matched
      }else{
          return "Password not matched"
      }
  
  }else {
      return "Username not found"
  }
  console.log(matched)
}

//create a POST route for user to login
app.post('/login',(req,res)=>{

  const { username,password } = req.body;

  const user = dbUsers.find(user => user.username === username && user.password === password);

  if (user) {
    res.send(user);
  } else{
    res.send({error: "User not found"});
  }
})


function register (newusername, newpassword, newemail) {
  // todo: check if username exist
  let userCheck = dbUsers.find(element =>
      element.username == newusername
  ) // check username in database
  if (userCheck){
      return "User already registered"
  } else {
      dbUsers.push({
          username: newusername,
          password: newpassword,
          email: newemail
      })
  }
}



app.post('/register',(req,res) =>
  let data = req.body
  res.send(
      regster(
        data.username,
        data.password,
        data.name,
        data.email
      )
  );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})