import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SelectInputField from './partials/SelectInputField';

import TextInputField from './partials/TextInputField';
import ErrorHandlerAler from './partials/ErrorHandlerAler'

export class PagoForm extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                mount: {
                    placeholder: 'Insert the mount',
                    type: 'number',
                    value: ''
                },
                divisa_id: {
                    placeholder: 'Selecciona la divisa',
                    options: [],
                    value: ''
                },
                instrumento_id: {
                    placeholder: 'Selecciona el instrumento',
                    options: [],
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
            pagoId: null,
            pagoLoading: true,
            divisaLoading: true,
            instrumentoLoading: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { pagoId } = this.props.match.params
        if (pagoId !== undefined) {
            axios.get(`http://localhost:8000/api/productos/get/${pagoId}`).then(res => {

                const formControls = {
                    name: {
                        placeholder: 'Insert the name',
                        type: 'text',
                        value: res.data.product.name
                    },
                    mount: {
                        placeholder: 'Insert the mount',
                        type: 'number',
                        value: res.data.product.mount
                    },
                    divisa_id: {
                        placeholder: 'Insert the divisa_id',
                        type: 'number',
                        value: res.data.product.divisa_id
                    },
                    instrumento_id: {
                        placeholder: 'Insert the instrumento_id',
                        type: 'number',
                        value: res.data.product.instrumento_id
                    },
                    category_id: {
                        placeholder: 'Selecciona una categoría',
                        value: res.data.product.category_id
                    },
                }

                console.log(res.data.product);

                this.setState({
                    ...this.state,
                    'pagoId': pagoId,
                    'formControls': formControls
                });

            }).catch(err => console.log(err));
        }

        axios.get('http://localhost:8000/api/divisas/').then(res => {
            let options = [];
            res.data.divisas.forEach(item => {
                const opt = { ...item, displayValue: `Tasa: ${item.tasa}`, value: item.id }
                options.push(opt);
            });

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    divisa_id: {
                        ...this.state.formControls.divisa_id,
                        options: options
                    }
                }
            }, () => this.setState({ ...this.state, divisaLoading: false }))
        });

        axios.get('http://localhost:8000/api/instrumentos/').then(res => {
            let options = [];
            res.data.instrumentos.forEach(item => {
                const opt = { ...item, displayValue: `Tipo: ${item.tipo} - Monto: ${item.mount}`, value: item.id }
                options.push(opt);
            });

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    instrumento_id: {
                        ...this.state.formControls.instrumento_id,
                        options: options
                    }
                }
            }, () => this.setState({ ...this.state, instrumentoLoading: false }))
        });
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
        }, () => console.log(this.state.formControls));
    }

    // Handle form submit
    handleSubmit(event) {
        event.preventDefault();

        const form = this.state.formControls;

        const pago = {
            'mount': form.mount.value,
            'divisa_id': form.divisa_id.value,
            'instrumento_id': form.instrumento_id.value,
            'factura_id': 1,
            'is_available': true
        }

        console.log(pago);

        if (this.state.pagoId !== null) {
            this.updateProduct(pago)
        } else {
            this.createNewProduct(pago)
        }

    }

    createNewProduct(pago) {
        // Send the data to the api and create a new pago
        axios.post('http://localhost:8000/api/pagos/', { pago }).then(res => {
            this.setState({ redirect: "/products" });
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

    updateProduct(product) {
        // Send the data to the api and create a new product
        axios.put(`http://localhost:8000/api/productos/${this.state.pagoId}`, { product }).then(res => {
            this.setState({ redirect: "/productos" });
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
                    <h3>Crear Pago</h3>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} className="form-group">
                                <TextInputField name="mount"
                                    placeholder={this.state.formControls.mount.placeholder}
                                    value={this.state.formControls.mount.value}
                                    onChange={this.handleChange} />

                                <div className="form-group">
                                    <SelectInputField name="divisa_id"
                                        value={this.state.formControls.divisa_id.value}
                                        onChange={this.handleChange}
                                        placeholder={this.state.formControls.divisa_id.placeholder}
                                        loading={this.state.categoriesLoading}
                                        options={this.state.formControls.divisa_id.options} />
                                </div>
                                <div className="form-group">
                                    <SelectInputField name="instrumento_id"
                                        value={this.state.formControls.instrumento_id.value}
                                        onChange={this.handleChange}
                                        placeholder={this.state.formControls.instrumento_id.placeholder}
                                        loading={this.state.categoriesLoading}
                                        options={this.state.formControls.instrumento_id.options} />
                                </div>

                                {
                                    this.state.handleErrors.exist ? <ErrorHandlerAler errors={this.state.handleErrors.errors} keys={['mount', 'divisa_id', 'instrumento_id']} /> : ''
                                }
                                <input type="submit" value="Guardar Producto" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PagoForm
