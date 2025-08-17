import "dotenv/config";
import mongoose from "mongoose";
import Food from "../models/Food.js";

const data = [
  // burgers
  { title: "Classic Cheeseburger", price: 169, image: "", desc: "Beef patty, cheese, lettuce, tomato", category: "burger", tags: ["cheese"] },
  { title: "Veggie Burger", price: 149, image: "", desc: "Crispy veg patty, fresh veggies", category: "burger" },
  // pizzas
  { title: "Margherita Pizza", price: 249, image: "", desc: "Cheese, basil, tomato sauce", category: "pizza" },
  { title: "Pepperoni Pizza", price: 299, image: "", desc: "Pepperoni & mozzarella", category: "pizza" },
  // sandwiches
  { title: "Grilled Cheese Sandwich", price: 129, image: "", desc: "Butter-grilled, molten cheese", category: "sandwich" },
  { title: "Chicken Club Sandwich", price: 179, image: "", desc: "Chicken, bacon, tomato, lettuce", category: "sandwich" },
  // fries & sides
  { title: "French Fries", price: 99, image: "", desc: "Crispy golden fries", category: "fries" },
  { title: "Peri Peri Fries", price: 119, image: "", desc: "Spicy, zesty fries", category: "fries" },
  // pasta
  { title: "White Sauce Pasta", price: 199, image: "", desc: "Creamy alfredo", category: "pasta" },
  { title: "Arrabbiata Pasta", price: 189, image: "", desc: "Spicy tomato sauce", category: "pasta" },
  // shakes & beverages
  { title: "Chocolate Shake", price: 129, image: "", desc: "Thick & creamy", category: "shake" },
  { title: "Strawberry Shake", price: 129, image: "", desc: "Fresh & sweet", category: "shake" },
  { title: "Iced Coffee", price: 119, image: "", desc: "Cold brew over ice", category: "beverage" },
  // desserts
  { title: "Choco Lava Cake", price: 139, image: "", desc: "Warm gooey center", category: "dessert" },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Food.deleteMany({});
  await Food.insertMany(data);
  console.log("✅ Seeded foods");
  await mongoose.disconnect();
  process.exit(0);
};
run().catch(e => { console.error(e); process.exit(1); });
