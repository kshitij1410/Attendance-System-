import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";


function App() {
  return (
    <Router>
      <Topbar />
       <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/attendance">
            <UserList />
           
          </Route>
          <Route path="/transactions">
            <User />
          </Route>
          <Route path="/reports">
            <NewUser />
          </Route>
          <Route path="/mail">
            <ProductList />
          </Route>
          <Route path="/feedback">
            <Product />
          </Route>
          <Route path="/messages">
            <NewProduct />
          </Route>
          {/* <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route> */}
        </Switch>
      </div> 
    </Router>
  );
}

export default App;
