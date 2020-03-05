import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class DeliveryDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deliveries: [],
            usuarios: [],
            usuariosLoading: true,
        };

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getProductsFromAPI();
        this.getUsuariosFromAPI();

    }

    getProductsFromAPI() {
        Axios.get('http://localhost:8000/api/entregas/').then(res => {
            this.setState({
                ...this.state,
                deliveries: res.data.deliveries
            });
        }).catch(err => console.log(err));
    }

    getUsuariosFromAPI() {
        Axios.get('http://localhost:8000/api/usuarios/').then(res => {
            this.setState({
                ...this.state,
                usuarios: res.data.usuarios
            }, () => {
                let array = [];
                this.state.usuarios.forEach(user => {
                    this.state.deliveries.forEach(delivery => {
                        if (delivery.entregado_por_id === user.id) {
                            const opt = {
                                ...delivery, 'entregado_por': user
                            }
                            
                            array.push(opt);
                        }
                    });
                });
                this.setState({
                    ...this.state,
                    deliveries: array
                }, ()=> this.setState({...this.state, usuariosLoading: false}));
            });
        });
    }

    deleteProduct(product) {
        const newProduct = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/entregas/${product.id}`, { 'delivery': newProduct }).then(res => {
            this.getProductsFromAPI();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todos los Deliveries</h3>
                        <hr />
                        <Link to="/new/delivery" className="btn btn-primary mb-4">Crear Delivery</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">Descuento</th>
                                            <th scope="col">Tiempo de Entrega</th>
                                            <th scope="col">Entregado por</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.deliveries.map(delivery => {
                                            return delivery.is_available ? <tr key={delivery.id}>
                                                <th scope="row">{delivery.id}</th>
                                                <td>{delivery.direction}</td>
                                                <td>{delivery.discount}</td>
                                                <td>{delivery.delivery_time}</td>
                                                <td>{this.state.usuariosLoading ? '' : delivery.entregado_por.name}</td>
                                                <td>
                                                    <button onClick={() => this.deleteProduct(delivery)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
                                                    {/* <Link to={`/update/delivery/${delivery.id}`} className="btn btn-sm btn-warning">Editar</Link> */}
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

export default DeliveryDashboard
