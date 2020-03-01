import React from 'react'
import Navbar from './components/partials/Navbar'
import ProductForm from './components/ProductForm';
import ProductDashboard from './components/ProductDashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route path="/products" component={ProductDashboard} />
        <Route path="/new/product" component={ProductForm} />
        <Route path="/update/product/:productId" component={ProductForm} />
      </Switch>
    </Router>
  );
}


export default App
