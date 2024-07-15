const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //FORM URL

app.get("/", (req, res) => {
  res.send("Hello from Node Api Server Updated");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

//Update Product
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.send(404).json({ message: "Product not Found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

//Delete a Product
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.send(404).json({ message: "Product not Found" });
    }

    res.status(200).json({ message: "Product deleted Successfully" });
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://saurabhravte23:saurabh@backend.j3zuzu6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running in port 3000");
    });
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
