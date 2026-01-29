import React from 'react';
import './App.css';
import Home from './components/Home';
import OrderProcess from './components/OrderProcess';
import QuantityEditor from './components/QuantityEditor';
import ProductForm from './components/ProductForm';
import TodoList from './components/TodoList';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ex1" element={<QuantityEditor />} />
          <Route path="/ex2" element={<OrderProcess />} />
          <Route path="/ex3" element={<ProductForm />} />
          <Route path="/ex4" element={<TodoList />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
