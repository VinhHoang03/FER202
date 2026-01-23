import React from "react";
import PizzaList from "./PizzaList";

function Home() {
  return (
    <div className="container mt-4">
      <h1>Welcome to Pizza Shop 🍕</h1>
      <p>Best pizza in town. Fresh, hot, and delicious!</p>
      <PizzaList />
    </div>
  );
}

export default Home;
