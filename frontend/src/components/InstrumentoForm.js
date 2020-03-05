import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SelectInputField from './partials/SelectInputField';

import TextInputField from './partials/TextInputField';
import ErrorHandlerAler from './partials/ErrorHandlerAler'

export class InstrumentoForm extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                codigo: {
                    placeholder: 'Inserta el codigo',
                    type: 'number',
                    value: ''
                },
                mount: {
                    placeholder: 'Inserta el monto',
                    type: 'number',
                    value: ''
                },
                tipo: {
                    placeholder: 'Inserta el tipo de instrumento',
                    type: 'text',
                    value: ''
                },
            },
            handleErrors: {
                exist: false,
                errors: {
                    direction: [],
                    description: [],
                }
            },
            redirect: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    // Handle change event in the inputs
    handleChange(event) {
        const name = event.target.name; // Input name
        let value = event.target.value; // Input value

        if (name === "tasa" || name === "codigo" || name === "mount") {
            value = Number(value);
        }

        this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        }, () => console.log(this.state.formControls));
    }

    // Handle form submit
    handleSubmit(event) {
        event.preventDefault();

        const form = this.state.formControls;

        const instrumento = {
            'codigo': form.codigo.value,
            'mount': form.mount.value,
            'tipo': form.tipo.value,
            'is_available': true
        }

        this.createNewProduct(instrumento)

    }

    createNewProduct(instrumento) {
        // Send the data to the api and create a new instrumento
        axios.post('http://localhost:8000/api/instrumentos/', { instrumento }).then(res => {
            console.log(res.data);
            this.setState({ redirect: "/instrumentos" });
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
                    <h3>Crear Instrumento</h3>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} className="form-group">
                                <TextInputField name="codigo"
                                    placeholder={this.state.formControls.codigo.placeholder}
                                    value={this.state.formControls.codigo.value}
                                    onChange={this.handleChange} />

                                <TextInputField name="mount"
                                    placeholder={this.state.formControls.mount.placeholder}
                                    value={this.state.formControls.mount.value}
                                    onChange={this.handleChange} />

                                <TextInputField name="tipo"
                                    placeholder={this.state.formControls.tipo.placeholder}
                                    value={this.state.formControls.tipo.value}
                                    onChange={this.handleChange} />

                                {
                                    this.state.handleErrors.exist ? <ErrorHandlerAler errors={this.state.handleErrors.errors} keys={['mount', 'codigo', 'tipo']} /> : ''
                                }
                                <input type="submit" value="Guardar Instrumento" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentoForm
