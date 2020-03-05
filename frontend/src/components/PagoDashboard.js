import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class PagoDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pagos: []
        };

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getProductsFromAPI();
    }

    getProductsFromAPI() {
        Axios.get('http://localhost:8000/api/pagos/').then(res => {
            this.setState({
                ...this.state,
                pagos: res.data.pagos
            });

            console.log(this.state);
        }).catch(err => console.log(err));
    }

    deleteProduct(product) {
        const newProduct = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/pagos/${product.id}`, { 'product': newProduct }).then(res => {
            this.getProductsFromAPI();            
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todos los Pagos</h3>
                        <hr />
                        {/* <Link to="/new/producto" className="btn btn-primary mb-4">Crear Producto</Link> */}
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Monto</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.pagos.map(pago => {
                                            return pago.is_available ? <tr key={pago.id}>
                                                <th scope="row">{pago.id}</th>
                                                <td>{pago.mount} $</td>
                                                <td>
                                                    <button onClick={() => this.deleteProduct(pago)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
                                                    {/* <Link to={`/update/pago/${pago.id}`} className="btn btn-sm btn-warning">Editar</Link> */}
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

export default PagoDashboard
