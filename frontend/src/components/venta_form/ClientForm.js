import React, { Component } from 'react'
import TextInputField from '../partials/TextInputField';
import axios from 'axios';

export class ClientForm extends Component {

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
                    placeholder: 'Inserta el numero de telefono',
                    type: 'number',
                    value: ''
                },
                cedula: {
                    placeholder: 'Inserta la cedula',
                    type: 'number',
                    value: ''
                },
                birthday: {
                    placeholder: 'Inserta fecha de nacimiento. (Formato: YYYY-MM-DD)',
                    type: 'date',
                    value: ''
                },
                ubication: {
                    placeholder: 'Inserta la direccion',
                    type: 'text',
                    value: ''
                },
                tipo: {
                    placeholder: 'Inserte si el comprado tambien quiere hacer delivery',
                    type: 'text',
                    value: ''
                },
                empleado: {
                    placeholder: 'Seleccione el vendedor',
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
            empleadosLoading: true,
            empleados: [],
            cliente: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createNewClient = this.createNewClient.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/empleados/').then(res => {
            this.setState({
                ...this.state,
                empleados: res.data.empleados
            }, () => this.setState({
                ...this.state,
                empleadosLoading: false
            }));
        }).catch(err => console.log(err));
    }

    handleChange(event) {
        const name = event.target.name; // Input name
        const value = event.target.value; // Input value

        this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createNewClient();
    }

    createNewClient() {
        const form = this.state.formControls;
        const usuario = {
            'name': form.name.value,
            'phone': form.phone.value,
            'cedula': form.cedula.value,
            'birthday': form.birthday.value,
            'ubication': form.ubication.value,
            'is_available': true
        }

        axios.post('http://localhost:8000/api/usuarios/', { usuario }).then(res => {
            console.log(res.data.usuario);
            const cliente = {
                'usuario_id': res.data.usuario.id,
                'tipo': form.tipo.value,
                'empleado_id': Number(form.empleado.value),
                'is_available': true
            }
            axios.post('http://localhost:8000/api/clientes/', { cliente }).then(res => {
                cliente.usuario = usuario;
                this.setState({
                    ...this.state,
                    cliente: cliente
                }, () => this.props.parentCallback(cliente))
            }).catch(err => {
                const errors = {
                    exist: true,
                    errors: err.response.data
                };
                this.setState({
                    ...this.state,
                    handleErrors: errors
                })

                console.log('Cliente err: ' + err);
                console.log(this.state.handleErrors);
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

            console.log('usuario err: ' + err);
            console.log(this.state.handleErrors);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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

                <div className="form-group">
                    {this.state.empleadosLoading ? <h3>Loading...</h3>
                    : <select className="form-control" name="empleado" onChange={this.handleChange}>
                        <option value={this.state.formControls.empleado.value}>{this.state.formControls.empleado.placeholder}</option>
                        {
                            this.state.empleados.map(item => {
                                return <option value={item.id} key={item.id}>{item.id} - {item.cargo}</option>
                            })
                        }
                    </select>}
                </div>

                <div className="form-group">
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
        )
    }
}

export default ClientForm
