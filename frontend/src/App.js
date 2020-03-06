import React from 'react';
import Navbar from './components/partials/Navbar';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import ClientForm from './components/ClientForm';
import ProductDashboard from './components/ProductDashboard';
import ClientDashboard from './components/ClientDashboard';
import DeliveryForm from './components/DeliveryForm';
import DeliveryDashboard from './components/DeliveryDashboard';
import VentaForm from './components/VentaForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PagoForm from './components/PagoForm';
import PagoDashboard from './components/PagoDashboard';
import VentaDashboard from './components/VentaDashboard';
import DivisaForm from './components/DivisaForm';
import InstrumentoForm from './components/InstrumentoForm';
import DivisaDashboard from './components/DivisaDashboard';
import InstrumentoDashboard from './components/InstrumentoDashboard';
import CategoryForm from './components/CategoryForm';
import CategoryDashboard from './components/CategoryDashboard';
import EmpleadoForm from './components/EmpleadoForm';
import EmpleadoDashboard from './components/EmpleadoDashboard';
function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/productos" component={ProductDashboard} />
        <Route path="/clientes" component={ClientDashboard} />
        <Route path="/delivery" component={DeliveryDashboard} />
        <Route path="/pagos" component={PagoDashboard} />
        <Route path="/ventas" component={VentaDashboard} />
        <Route path="/divisas" component={DivisaDashboard} />
        <Route path="/instrumentos" component={InstrumentoDashboard} />
        <Route path="/categorias" component={CategoryDashboard} />
        <Route path="/empleados" component={EmpleadoDashboard} />
        {/* <Route path="" component={DynamicField} /> */}
        <Route path="/new/producto" component={ProductForm} />
        <Route path="/update/producto/:productId" component={ProductForm} />
        <Route path="/new/cliente" component={ClientForm} />
        <Route path="/update/cliente/:clientId" component={ClientForm} />
        <Route path="/new/delivery" component={DeliveryForm} />
        <Route path="/new/pago" component={PagoForm} />
        <Route path="/new/divisa" component={DivisaForm} />
        <Route path="/new/instrumento" component={InstrumentoForm} />
        <Route path="/new/categoria" component={CategoryForm} />
        <Route path="/new/empleado" component={EmpleadoForm} />
        <Route path="/new/venta" component={VentaForm} />
      </Switch>
    </Router>
  );
}


export default App
