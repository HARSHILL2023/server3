const express = require("express");

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
  { id: 3, name: "Spino", role: "IGL" },
  { id: 4, name: "Moltec", role: "Gammer" },
];

app.get("/", (req, res) => {
  res.send("Hi! My name is Anand");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role,
    age:  req.body.age,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser,
  });
});

app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: userId,
    name: req.body.name,
    role: req.body.role,
    age :req.body.age
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index],
  });
});


app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.delete("/user/:name", (req, res) => {
  const userName = Number(req.params.name);
  const index = users.findIndex(u => u.name === userName);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
}); 

app.patch("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});