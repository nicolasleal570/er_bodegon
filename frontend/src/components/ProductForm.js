import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";

import TextInputField from './partials/TextInputField';

export class ProductForm extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                name: {
                    placeholder: 'Insert the name',
                    type: 'text',
                    value: ''
                },
                codigo: {
                    placeholder: 'Insert the codigo',
                    type: 'number',
                    value: ''
                },
                costo: {
                    placeholder: 'Insert the costo',
                    type: 'number',
                    value: ''
                },
                descuento: {
                    placeholder: 'Insert the descuento',
                    type: 'number',
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
            productId: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { productId } = this.props.match.params
        if (productId !== undefined) {
            axios.get(`http://localhost:8000/api/products/get/${productId}`).then(res => {

            const formControls = {
                name: {
                    placeholder: 'Insert the name',
                    type: 'text',
                    value: res.data.product.name
                },
                codigo: {
                    placeholder: 'Insert the codigo',
                    type: 'number',
                    value: res.data.product.codigo
                },
                costo: {
                    placeholder: 'Insert the costo',
                    type: 'number',
                    value: res.data.product.costo
                },
                descuento: {
                    placeholder: 'Insert the descuento',
                    type: 'number',
                    value: res.data.product.descuento
                },
            }

            this.setState({
                ...this.state,
                'productId': productId,
                'formControls': formControls
            });

        }).catch(err => console.log(err));        
        }
    }

    // Handle change event in the inputs
    handleChange(event) {
        const name = event.target.name; // Input name
        const value = event.target.value; // Input value

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }

    // Handle form submit
    handleSubmit(event) {
        event.preventDefault();

        const form = this.state.formControls;

        const product = {
            'name': form.name.value,
            'codigo': form.codigo.value,
            'costo': form.costo.value,
            'descuento': form.descuento.value,
            'is_available': true
        }

        if (this.state.productId !== null) {
            this.updateProduct(product)
        } else {
            this.createNewProduct(product)
        }

    }

    createNewProduct(product){
        // Send the data to the api and create a new product
        axios.post('http://localhost:8000/api/products/', { product }).then(res => {
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

    updateProduct(product){
        // Send the data to the api and create a new product
        axios.put(`http://localhost:8000/api/products/${this.state.productId}`, { product }).then(res => {
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

    // Render method
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="row my-4">
                <div className="col-md-4 mx-auto">
                    <h3>Crear Producto</h3>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} className="form-group">
                                <TextInputField name="name"
                                    placeholder={this.state.formControls.name.placeholder}
                                    value={this.state.formControls.name.value}
                                    onChange={this.handleChange} />

                                <TextInputField name="codigo"
                                    placeholder={this.state.formControls.codigo.placeholder}
                                    value={this.state.formControls.codigo.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="costo"
                                    placeholder={this.state.formControls.costo.placeholder}
                                    value={this.state.formControls.costo.value}
                                    onChange={this.handleChange} />
                                <TextInputField name="descuento"
                                    placeholder={this.state.formControls.descuento.placeholder}
                                    value={this.state.formControls.descuento.value}
                                    onChange={this.handleChange} />
                                {
                                    this.state.handleErrors.exist ? <h1>Hay errores</h1> : ''
                                }
                                <input type="submit" value="Submit" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductForm
