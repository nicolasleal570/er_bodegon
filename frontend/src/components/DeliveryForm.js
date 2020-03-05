import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SelectInputField from './partials/SelectInputField';

import TextInputField from './partials/TextInputField';
import ErrorHandlerAler from './partials/ErrorHandlerAler'

export class DeliveryForm extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                direction: {
                    placeholder: 'Inserta la direccion',
                    type: 'text',
                    value: ''
                },
                discount: {
                    placeholder: 'Inserta el descuento',
                    type: 'number',
                    value: ''
                },
                delivery_time: {
                    placeholder: 'Inserta el tiempo de entrega (Formato: HH:MM:ss)',
                    type: 'time',
                    value: ''
                },
                entregado_por_id: {
                    placeholder: 'Selecciona el usuario que hará la entrega',
                    options: [],
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

        axios.get('http://localhost:8000/api/usuarios/').then(res => {
            let options = [];
            res.data.usuarios.forEach(item => {
                const opt = { ...item, displayValue: item.name, value: item.id }
                options.push(opt);
            });

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    entregado_por_id: {
                        ...this.state.formControls.entregado_por_id,
                        options: options
                    }
                }
            }, () => this.setState({ ...this.state, usuariosLoading: false }));
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

        const delivery = {
            'direction': form.direction.value,
            'discount': Number(form.discount.value),
            'delivery_time': form.delivery_time.value,
            'entregado_por_id': Number(form.entregado_por_id.value),
            'is_available': true
        }

        if (this.state.deliveryId !== null) {
            this.updateProduct(delivery)
        } else {
            this.createNewProduct(delivery)
        }

    }

    createNewProduct(delivery) {
        // Send the data to the api and create a new delivery
        axios.post('http://localhost:8000/api/entregas/', { "delivery": delivery }).then(res => {
            this.setState({ redirect: "/delivery" });
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
                                <TextInputField name="direction"
                                    placeholder={this.state.formControls.direction.placeholder}
                                    value={this.state.formControls.direction.value}
                                    onChange={this.handleChange} />

                                <TextInputField name="discount"
                                    placeholder={this.state.formControls.discount.placeholder}
                                    value={this.state.formControls.discount.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="delivery_time"
                                    placeholder={this.state.formControls.delivery_time.placeholder}
                                    value={this.state.formControls.delivery_time.value}
                                    onChange={this.handleChange} />

                                <div className="form-group">
                                    <SelectInputField name="entregado_por_id"
                                        value={this.state.formControls.entregado_por_id.value}
                                        onChange={this.handleChange}
                                        placeholder={this.state.formControls.entregado_por_id.placeholder}
                                        loading={this.state.usuariosLoading}
                                        options={this.state.formControls.entregado_por_id.options} />
                                </div>

                                {
                                    this.state.handleErrors.exist ? <ErrorHandlerAler errors={this.state.handleErrors.errors} keys={['direction', 'discount', 'delivery_time', 'entregado_por_id']} /> : ''
                                }
                                <input type="submit" value="Guardar Delivery" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeliveryForm
