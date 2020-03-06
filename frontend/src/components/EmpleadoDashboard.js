import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class ClientDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            empleados: []
        };

        this.deleteClient = this.deleteClient.bind(this);
        this.getClientsFromAPI = this.getClientsFromAPI.bind(this);
    }

    componentDidMount() {
        this.getClientsFromAPI();
    }

    getClientsFromAPI() {
        let empleados = []
        Axios.get('http://localhost:8000/api/empleados/').then(res => {
            Axios.get('http://localhost:8000/api/usuarios/').then(respon => {
                res.data.empleados.forEach(cliente => {
                    respon.data.usuarios.forEach(usuario => {
                        if (cliente.usuario_id === usuario.id) {
                            let obj = { ...cliente, ...usuario }
                            empleados.push(obj);
                            this.setState({
                                ...this.state,
                                empleados
                            }, () => console.log(this.state));
                        }
                    });
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));

    }

    deleteClient(empleado) {
        const newClient = {
            ...empleado,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/empleados/${empleado.id}`, { 'empleado': newClient }).then(res => {
            this.getClientsFromAPI();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todos los Empleados</h3>
                        <hr />
                        <Link to="/new/empleado" className="btn btn-primary mb-4">Crear Empleado</Link>
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
                                            <th scope="col">Cargo</th>
                                            <th scope="col">Sueldo</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.empleados.map(empleado => {
                                            return empleado.is_available ? <tr key={empleado.id}>
                                                <th scope="row">{empleado.id}</th>
                                                <td>{empleado.name}</td>
                                                <td>{empleado.phone}</td>
                                                <td>{empleado.cedula}</td>
                                                <td>{empleado.birthday}</td>
                                                <td>{empleado.ubication}</td>
                                                <td>{empleado.sueldo}</td>
                                                <td>{empleado.cargo}</td>
                                                <td>
                                                    <button onClick={() => this.deleteClient(empleado)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
                                                    {/* <Link to={`/update/empleado/${empleado.id}`} className="btn btn-sm btn-warning">Editar</Link> */}
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
