import React from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Greeting from "./components/Greeting/Greeting";

const MENU = [
  {
    name: "Pizza Margarita",
    description: "mozzarella, tomatoes, arugula, basil",
    price: 6.75,
    id: "001",
  },
  {
    name: "Falafel Roll",
    description:
      "pita, falafel, carrot hummus, spicy carrots, tomato, pickle, cabbage, tartar sauce",
    price: 5.95,
    id: "002",
  },
  {
    name: "Pasta Ai Fungi Con Pollo",
    description:
      "spaghetti, vegan chicken, mushrooms, parmesan, olive oil, basil",
    price: 8.65,
    id: "003",
  },
];

function App() {
  return (
    <div>
      <Header />
      <Greeting />
      <Menu menu={MENU} />
    </div>
  );
}

export default App;
