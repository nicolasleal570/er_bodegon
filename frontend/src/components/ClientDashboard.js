import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class ClientDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clientes: []
        };

        this.deleteClient = this.deleteClient.bind(this);
        this.getClientsFromAPI = this.getClientsFromAPI.bind(this);
    }

    componentDidMount() {
        this.getClientsFromAPI();
    }

    getClientsFromAPI() {
        let clientes = []
        Axios.get('http://localhost:8000/api/clientes/').then(res => {
            Axios.get('http://localhost:8000/api/usuarios/').then(respon => {
                res.data.clientes.forEach(cliente => {
                    respon.data.usuarios.forEach(usuario => {
                        if (cliente.usuario_id === usuario.id) {
                            let obj = { ...cliente, ...usuario }
                            clientes.push(obj);
                            this.setState({
                                ...this.state,
                                clientes
                            }, () => console.log(this.state));
                        }
                    });
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));

    }

    deleteClient(product) {
        const newClient = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/clientes/${product.id}`, { 'product': newClient }).then(res => {
            this.getClientsFromAPI();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todos los Clientes</h3>
                        <hr />
                        <Link to="/new/cliente" className="btn btn-primary mb-4">Crear Cliente</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Teléfono</th>
                                            <th scope="col">Cédula</th>
                                            <th scope="col">Cumpleaños</th>
                                            <th scope="col">Ubicación</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.clientes.map(cliente => {
                                            return cliente.is_available ? <tr key={cliente.id}>
                                                <th scope="row">{cliente.id}</th>
                                                <td>{cliente.name}</td>
                                                <td>{cliente.phone}</td>
                                                <td>{cliente.cedula}</td>
                                                <td>{cliente.birthday}</td>
                                                <td>{cliente.ubication}</td>
                                                <td>
                                                    <button onClick={() => this.deleteClient(cliente)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
                                                    {/* <Link to={`/update/cliente/${cliente.id}`} className="btn btn-sm btn-warning">Editar</Link> */}
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

export default ClientDashboard
