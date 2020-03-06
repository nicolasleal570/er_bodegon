import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export class CategoryDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
        };

    }

    componentDidMount() {
        this.getInstrumentosFromAPI();
    }

    getInstrumentosFromAPI() {
        Axios.get('http://localhost:8000/api/categorias/').then(res => {
            this.setState({
                ...this.state,
                categorias: res.data.categories
            });
        }).catch(err => console.log(err));
    }

    deleteInstrumento(product) {
        const newInstrumento = {
            ...product,
            'is_available': false
        }

        Axios.put(`http://localhost:8000/api/categorias/${product.id}`, { 'category': newInstrumento }).then(res => {
            this.getInstrumentosFromAPI();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Todas las Categorias</h3>
                        <hr />
                        <Link to="/new/categoria" className="btn btn-primary mb-4">Crear Categoria</Link>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.categorias.map(categoria => {
                                            return categoria.is_available ? <tr key={categoria.id}>
                                                <th scope="row">{categoria.id}</th>
                                                <td>{categoria.name}</td>
                                                <td>
                                                    <button type="button" onClick={() => this.deleteInstrumento(categoria)} className="btn btn-sm btn-danger mr-3">Eliminar</button>
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

export default CategoryDashboard
