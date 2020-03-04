import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class ProductDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getProductsFromAPI();
    }

    getProductsFromAPI() {
        Axios.get('http://localhost:8000/api/productos/').then(res => {
            this.setState({
                ...this.state,
                products: res.data.products
            });

            console.log(this.state);
        }).catch(err => console.log(err));
    }

    deleteProduct(product) {
        const newProduct = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/productos/${product.id}`, { 'product': newProduct }).then(res => {
            this.getProductsFromAPI();            
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todos los Producto</h3>
                        <hr />
                        <Link to="/new/producto" className="btn btn-primary mb-4">Crear Producto</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Codigo</th>
                                            <th scope="col">Precio real</th>
                                            <th scope="col">Descuento</th>
                                            <th scope="col">Precio con Descuento</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.products.map(product => {
                                            return product.is_available ? <tr key={product.id}>
                                                <th scope="row">{product.id}</th>
                                                <td>{product.name}</td>
                                                <td>{product.codigo}</td>
                                                <td>{product.costo} $</td>
                                                <td>{product.descuento}%</td>
                                                <td>{product.descuento !== 0 ? (product.costo * (product.descuento / 100)).toFixed(2) : product.costo} $</td>
                                                <td>
                                                    <button onClick={() => this.deleteProduct(product)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
                                                    <Link to={`/update/producto/${product.id}`} className="btn btn-sm btn-warning">Editar</Link>
                                                </td>
                                            </tr> : ''
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDashboard
