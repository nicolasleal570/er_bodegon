import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SelectInputField from './partials/SelectInputField';

import TextInputField from './partials/TextInputField';
import ErrorHandlerAler from './partials/ErrorHandlerAler'

export class ClientForm extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                name: {
                    placeholder: 'Inserta el nombre',
                    type: 'text',
                    value: ''
                },
                phone: {
                    placeholder: 'Inserta el número de teléfono',
                    type: 'number',
                    value: ''
                },
                cedula: {
                    placeholder: 'Inserta la cédula',
                    type: 'number',
                    value: ''
                },
                birthday: {
                    placeholder: 'Inserta el cumpleaños (YYYY-MM-DD)',
                    type: 'date',
                    value: ''
                },
                ubication: {
                    placeholder: 'Inserta la ubicacion',
                    type: 'text',
                    value: ''
                },
                tipo: {
                    placeholder: 'Inserta el tipo de usuario',
                    type: 'text',
                    value: ''
                },
            },
            handleErrors: {
                exist: false,
                errors: {
                    name: [],
                    description: [],
                }
            },
            redirect: null,
            clientId: null,
            productLoading: true,
            categoriesLoading: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    componentDidMount() {
        const { clientId } = this.props.match.params
        if (clientId !== undefined) {
            axios.get(`http://localhost:8000/api/clientes/get/${clientId}`).then(res => {
                axios.get(`http://localhost:8000/api/usuarios/get/${res.data.cliente.usuario_id}`).then(respon => {
                    const formControls = {
                        name: {
                            placeholder: 'Insert the name',
                            type: 'text',
                            value: respon.data.usuario.name
                        },
                        phone: {
                            placeholder: 'Insert the phone',
                            type: 'number',
                            value: respon.data.usuario.phone
                        },
                        cedula: {
                            placeholder: 'Insert the cedula',
                            type: 'number',
                            value: respon.data.usuario.cedula
                        },
                        birthday: {
                            placeholder: 'Insert the birthday',
                            type: 'number',
                            value: respon.data.usuario.birthday
                        },
                        ubication: {
                            placeholder: 'Selecciona una categoría',
                            value: respon.data.usuario.ubication
                        },
                        tipo: {
                            placeholder: 'Inserta el tipo de usuario',
                            type: 'text',
                            value: res.data.cliente.tipo
                        },
                    }

                    this.setState({
                        ...this.state,
                        'clientId': clientId,
                        'formControls': formControls
                    }, () => console.log(`http://localhost:8000/api/clientes/${this.state.clientId}`));
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    // Handle change event in the inputs
    handleChange(event) {
        const name = event.target.name; // Input name
        let value = event.target.value; // Input value

        this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        }, () => console.log(this.state));
    }

    // Handle form submit
    handleSubmit(event) {
        event.preventDefault();

        const form = this.state.formControls;

        const usuario = {
            'name': form.name.value,
            'phone': form.phone.value,
            'cedula': form.cedula.value,
            'birthday': form.birthday.value,
            'ubication': form.ubication.value,
            'tipo': form.tipo.value,
            'is_available': true
        }

        if (this.state.clientId !== null) {
            this.updateProduct(usuario)
        } else {
            this.createNewProduct(usuario)
        }

    }

    createNewProduct(cliente) {
        let usuario = {
            'name': cliente.name,
            'phone': Number(cliente.phone),
            'cedula': Number(cliente.cedula),
            'birthday': cliente.birthday,
            'ubication': cliente.ubication,
            'is_available': true
        }

        let newCliente = {
            'tipo': cliente.tipo,
            'is_available': true
        }

        // Send the data to the api and create a new client
        axios.post('http://localhost:8000/api/usuarios/', { usuario }).then(res => {
            newCliente.usuario_id = res.data.usuario.id;
            axios.post('http://localhost:8000/api/clientes/', { 'cliente': newCliente }).then(respon => {
                console.log(res.data, respon.data);
                this.setState({ redirect: "/clientes" });
            });
        }).catch(err => {
            const errors = {
                exist: true,
                errors: err.response.data
            };
            this.setState({
                ...this.state,
                handleErrors: errors
            })

            console.log(this.state);
        });
    }

    updateProduct(cliente) {
        let usuario = {
            'name': cliente.name,
            'phone': Number(cliente.phone),
            'cedula': Number(cliente.cedula),
            'birthday': cliente.birthday,
            'ubication': cliente.ubication,
            'is_available': cliente.is_available
        }

        let newCliente = {
            'tipo': cliente.tipo,
            'is_available': cliente.is_available
        }

        // Send the data to the api and create a new product
        axios.put(`http://localhost:8000/api/clientes/${this.state.clientId}`, { 'cliente': newCliente }).then(res => {
            axios.put(`http://localhost:8000/api/usuarios/${usuario.id}`, { usuario }).then(respon => {
                this.setState({ redirect: "/clientes" });
            });
        }).catch(err => {
            const errors = {
                exist: true,
                errors: err.response.data
            };
            this.setState({
                ...this.state,
                handleErrors: errors
            })

            console.log(this.state);
        });
    }

    // Render method
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="row my-4">
                <div className="col-md-4 mx-auto">
                    <h3>Crear Cliente</h3>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} className="form-group">
                                <TextInputField name="name"
                                    placeholder={this.state.formControls.name.placeholder}
                                    value={this.state.formControls.name.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="phone"
                                    placeholder={this.state.formControls.phone.placeholder}
                                    value={this.state.formControls.phone.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="cedula"
                                    placeholder={this.state.formControls.cedula.placeholder}
                                    value={this.state.formControls.cedula.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="birthday"
                                    placeholder={this.state.formControls.birthday.placeholder}
                                    value={this.state.formControls.birthday.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="ubication"
                                    placeholder={this.state.formControls.ubication.placeholder}
                                    value={this.state.formControls.ubication.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="tipo"
                                    placeholder={this.state.formControls.tipo.placeholder}
                                    value={this.state.formControls.tipo.value}
                                    onChange={this.handleChange} />

                                {
                                    this.state.handleErrors.exist ? <ErrorHandlerAler errors={this.state.handleErrors.errors} keys={['name', 'phone', 'cedula', 'birthday', 'ubication', 'tipo']} /> : ''
                                }
                                <input type="submit" value="Guardar Cliente" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientForm
