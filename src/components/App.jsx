import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailNutrition from "./ProductDetailNutrition";
import ProductDetailStorage from "./ProductDetailStorage";
import Cart from "./Cart";

function App() {
  const restoreDarkTheme = localStorage.getItem("dark_theme") === "true";
  const [isDarkTheme, setIsDarkTheme] = useState(restoreDarkTheme);

  const [cart, setCart] = useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.log("error restoring saved cart: " + error);
      savedCart = [];
    }
    return savedCart;
  });

  console.log(localStorage);

  useEffect(() => {
    localStorage.setItem("dark_theme", isDarkTheme);
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function handleThemeClick() {
    setIsDarkTheme(!isDarkTheme);
  }

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists and quantity is less than the available stock
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct && existingProduct.quantity < newProduct.stock) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <BrowserRouter>
      <Navbar
        cart={cart}
        isDarkTheme={isDarkTheme}
        onThemeClick={handleThemeClick}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/products"
            element={
              <Products
                cart={cart}
                onProductAdd={handleProductAdd}
                onProductDelete={handleProductDelete}
              />
            }
          ></Route>
          <Route
            path="/products"
            element={
              <Products
                cart={cart}
                onProductAdd={handleProductAdd}
                onProductDelete={handleProductDelete}
              />
            }
          ></Route>
          <Route
            path="/products/:id/"
            element={
              <ProductDetails
                onProductAdd={handleProductAdd}
                onProductDelete={handleProductDelete}
                cart={cart}
              />
            }
          >
            <Route
              path=""
              element={<ProductDetailInfo onProductAdd={handleProductAdd} />}
            ></Route>

            <Route
              path="nutrition"
              element={<ProductDetailNutrition />}
            ></Route>

            <Route path="storage" element={<ProductDetailStorage />}></Route>
          </Route>
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                onProductDelete={handleProductDelete}
              />
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
