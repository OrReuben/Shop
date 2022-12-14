import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pay from "./Components/Pay";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Auction from "./pages/Auction";
import MyAuctions from "./pages/MyAuctions";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
        </Route>
        <Route path="/product">
          <Route index element={<Product />} />
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="/auction" element={user ? <Auction /> : <Home />} />
        <Route path="/myauctions" element={user ? <MyAuctions /> : <Home />} />
      </Routes>
    </Router>
  );
};

export default App;
