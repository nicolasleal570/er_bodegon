import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class DivisaDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            divisas: [],
        };

    }

    componentDidMount() {
        this.getDivisasFromAPI();
    }

    getDivisasFromAPI() {
        Axios.get('http://localhost:8000/api/divisas/').then(res => {
            this.setState({
                ...this.state,
                divisas: res.data.divisas
            });
        }).catch(err => console.log(err));
    }

    deleteDivisa(product) {
        const newDivisa = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/divisas/${product.id}`, { 'divisa': newDivisa }).then(res => {
            this.getDivisasFromAPI();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todas las Divisas</h3>
                        <hr />
                        <Link to="/new/divisas" className="btn btn-primary mb-4">Crear Divisa</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Tasa</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.divisas.map(divisa => {
                                            return divisa.is_available ? <tr key={divisa.id}>
                                                <th scope="row">{divisa.id}</th>
                                                <td>{divisa.tipo}</td>
                                                <td>{divisa.tasa}</td>
                                                <td>
                                                    <button onClick={() => this.deleteDivisa(divisa)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
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

export default DivisaDashboard
