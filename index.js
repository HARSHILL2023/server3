const express = require("express");

const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Cotton Jacket",
    price: 55.99,
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
];

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/all", (req, res) => {
  console.log("products", users);
  res.status(200).json(users);
});

app.get("/product", (req, res) => {
  console.log("products", users);
  res.status(200).json(users);
});

app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const user = users.find((u) => u.id === productId);

  if (!user) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(user);
});

app.get("/category/:type", (req, res) => {
  const categoryType = req.params.type;
  
  const decodedCategory = decodeURIComponent(categoryType);
  
  const filteredProducts = users.filter(u => u.category.toLowerCase() === decodedCategory.toLowerCase());

  if (filteredProducts.length === 0) {
    return res.status(404).json({ 
      message: "No products found in this category",
      requestedCategory: decodedCategory 
    });
  }

  res.status(200).json({
    category: decodedCategory,
    count: filteredProducts.length,
    products: filteredProducts
  });
});


app.post("/products", (req, res) => {
  if (Array.isArray(req.body)) {
    req.body.forEach(product => {
      users.push(product);
    });

    res.status(201).json({
      message: `${req.body.length} products created successfully`,
      products: req.body
    });
  } else {

    const newproduct = {
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      rating: req.body.rating,
    };

    users.push(newproduct);

    res.status(201).json({
      message: "Product created",
      product: newproduct,
    });
  }
});


app.post("/product", (req, res) => {
  const newproduct = {
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    rating: {
      rate: req.body.rate,
      count: req.body.count
    }
  };

  users.push(newproduct);

  res.status(201).json({
    message: "Product created",
    product: newproduct,
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});