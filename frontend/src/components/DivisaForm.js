import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SelectInputField from './partials/SelectInputField';

import TextInputField from './partials/TextInputField';
import ErrorHandlerAler from './partials/ErrorHandlerAler'

export class DivisaForm extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                tasa: {
                    placeholder: 'Inserta la tasa',
                    type: 'number',
                    value: ''
                },
                tipo: {
                    placeholder: 'Inserta el tipo de divisa',
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
            usuarios: [],
            redirect: null,
            deliveryId: null,
            usuariosLoading: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { deliveryId } = this.props.match.params
        if (deliveryId !== undefined) {
            axios.get(`http://localhost:8000/api/productos/get/${deliveryId}`).then(res => {

                const formControls = {
                    direction: {
                        placeholder: 'Insert the direction',
                        type: 'text',
                        value: res.data.product.direction
                    },
                    discount: {
                        placeholder: 'Insert the discount',
                        type: 'number',
                        value: res.data.product.discount
                    },
                    delivery_time: {
                        placeholder: 'Insert the delivery_time',
                        type: 'number',
                        value: res.data.product.delivery_time
                    },
                    entregado_por_id: {
                        placeholder: 'Insert the entregado_por_id',
                        type: 'number',
                        value: res.data.product.entregado_por_id
                    },
                }

                console.log(res.data.product);

                this.setState({
                    ...this.state,
                    'deliveryId': deliveryId,
                    'formControls': formControls
                });

            }).catch(err => console.log(err));
        }
    }

    // Handle change event in the inputs
    handleChange(event) {
        const name = event.target.name; // Input name
        let value = event.target.value; // Input value

        if (name === "tasa") {
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

        const delivery = {
            'tasa': form.tasa.value,
            'tipo': form.tipo.value,
            'is_available': true
        }

        if (this.state.deliveryId !== null) {
            this.updateProduct(delivery)
        } else {
            this.createNewProduct(delivery)
        }

    }

    createNewProduct(divisa) {
        // Send the data to the api and create a new divisa
        axios.post('http://localhost:8000/api/divisas/', { divisa }).then(res => {
            console.log(res.data);
            this.setState({ redirect: "/divisas" });
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
        axios.put(`http://localhost:8000/api/productos/${this.state.deliveryId}`, { product }).then(res => {
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
                    <h3>Crear Delivery</h3>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} className="form-group">
                                <TextInputField name="tasa"
                                    placeholder={this.state.formControls.tasa.placeholder}
                                    value={this.state.formControls.tasa.value}
                                    onChange={this.handleChange} />

                                <TextInputField name="tipo"
                                    placeholder={this.state.formControls.tipo.placeholder}
                                    value={this.state.formControls.tipo.value}
                                    onChange={this.handleChange} />

                                {
                                    this.state.handleErrors.exist ? <ErrorHandlerAler errors={this.state.handleErrors.errors} keys={['tasa', 'tipo']} /> : ''
                                }
                                <input type="submit" value="Guardar Divisa" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DivisaForm
