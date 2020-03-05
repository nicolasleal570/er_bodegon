import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class VentaDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            facturas: []
        };

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getProductsFromAPI();
    }

    getProductsFromAPI() {
        Axios.get('http://localhost:8000/api/facturas/').then(res => {
            this.setState({
                ...this.state,
                facturas: res.data.facturas
            });

            console.log(this.state);
        }).catch(err => console.log(err));
    }

    deleteProduct(product) {
        const newProduct = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/facturas/${product.id}`, { 'factura': newProduct }).then(res => {
            this.getProductsFromAPI();            
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todas las Facturas</h3>
                        <hr />
                        <Link to="/new/venta" className="btn btn-primary mb-4">Crear Venta</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Codigo</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.facturas.map(factura => {
                                            return factura.is_available ? <tr key={factura.id}>
                                                <th scope="row">{factura.id}</th>
                                                <td>{factura.codigo}</td>
                                                <td>{factura.total} $</td>
                                                <td>
                                                    <button onClick={() => this.deleteProduct(factura)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
                                                    {/* <Link to={`/update/facturao/${factura.id}`} className="btn btn-sm btn-warning">Editar</Link> */}
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

export default VentaDashboard
