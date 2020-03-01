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
        Axios.get('http://localhost:8000/api/products/').then(res => {
            this.setState({
                ...this.state.products,
                products: res.data.products
            });

            console.log(this.state);
        }).catch(err => console.log(err));
    }

    deleteProduct(index) {
        Axios.delete(`http://localhost:8000/api/products/${index}`).then(res => {
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
                        <Link to="/new/product" className="btn btn-primary mb-4">Crear Producto</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Codigo</th>
                                            <th scope="col">Costo</th>
                                            <th scope="col">Descuento</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.products.map(product => {
                                            return product.is_available ? <tr key={product.id}>
                                                <th scope="row">{product.id}</th>
                                                <td>{product.name}</td>
                                                <td>{product.codigo}</td>
                                                <td>{product.costo}</td>
                                                <td>{product.descuento}%</td>
                                                <td>
                                                    <button onClick={() => this.deleteProduct(product.id)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
                                                    <Link to={`/update/product/${product.id}`} className="btn btn-sm btn-warning">Editar</Link>
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
