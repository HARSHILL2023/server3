const express = require("express");

const app = express();
app.use(express.json());

const users = [
    {
        "studentName": "ABDUL HAQUE",
        "University": "SUxCG 714",
        "UniversityUID": "108444"
    },
    {
        "studentName": "ADITYA KUMAR",
        "University": "SUxCG 702",
        "UniversityUID": "108716",
    },
    {
        "studentName": "AMAN KUMAR",
        "University": "SUxCG 702",
        "UniversityUID": "108500"
    },
    {
        "studentName": "AMRIT RAJ",
        "University": "SUxCG 702",
        "UniversityUID": "108587"
    },
];

app.get("/users", (req, res) => {
    console.log("users", users)
    res.status(200).json(users);
});

// app.get("/users/cg/students/:gr_number", (req, res) => {
//   const userId = Number(req.params.id);
//   const user = users.find(u => u.id === userId);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.status(200).json(user);
// });

app.get("/users/cg", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/cg/students/gr/:id", (req, res) => {

    const num = req.params.id;

    const findd = users.find(u => u.UniversityUID === num)

    res.status(200).json(findd);
});

app.get("/users/cg/students/name/:name", (req, res) => {

    const names = req.params.name
   

    const answer = users.find(u => u.studentName.toLowerCase() === names.toLowerCase())

    res.status(200).json(answer);
});



app.post("/users/post", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});


app.get("/", (req, res) => {
    res.send("Express server is running");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});