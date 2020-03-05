import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class InstrumentoDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            instrumentos: [],
        };

    }

    componentDidMount() {
        this.getInstrumentosFromAPI();
    }

    getInstrumentosFromAPI() {
        Axios.get('http://localhost:8000/api/instrumentos/').then(res => {
            this.setState({
                ...this.state,
                instrumentos: res.data.instrumentos
            });
        }).catch(err => console.log(err));
    }

    deleteInstrumento(product) {
        const newInstrumento = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/instrumentos/${product.id}`, { 'instrumento': newInstrumento }).then(res => {
            this.getInstrumentosFromAPI();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todas las Instrumentos</h3>
                        <hr />
                        <Link to="/new/instrumento" className="btn btn-primary mb-4">Crear Instrumento</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Codigo</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Monto</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.instrumentos.map(instrumento => {
                                            return instrumento.is_available ? <tr key={instrumento.id}>
                                                <th scope="row">{instrumento.id}</th>
                                                <td>{instrumento.codigo}</td>
                                                <td>{instrumento.tipo}</td>
                                                <td>{instrumento.mount} $</td>
                                                <td>
                                                    <button onClick={() => this.deleteInstrumento(instrumento)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
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

export default InstrumentoDashboard
