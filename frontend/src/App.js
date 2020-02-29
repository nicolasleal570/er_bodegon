import React from 'react'
// import Navbar from './components/partials/Navbar/Navbar'
import ProductForm from './components/ProductForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function Home(){					
  return <h1> Hola mundo </h1>
}

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <ProductForm />

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}


export default App
