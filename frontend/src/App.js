import React from 'react';
import Navbar from './components/partials/Navbar';
import ProductForm from './components/ProductForm';
import UserForm from './components/UserForm';
import ProductDashboard from './components/ProductDashboard';
import ClientDashboard from './components/ClientDashboard';
import VentaForm from './components/venta_form/VentaForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route path="/productos" component={ProductDashboard} />
        <Route path="/clientes" component={ClientDashboard} />
        {/* <Route path="" component={DynamicField} /> */}
        <Route path="/new/producto" component={ProductForm} />
        <Route path="/update/producto/:productId" component={ProductForm} />
        <Route path="/new/usuario" component={UserForm} />
        <Route path="/new/venta" component={VentaForm} />
      </Switch>
    </Router>
  );
}


export default App
