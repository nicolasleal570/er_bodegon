import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SelectInputField from './partials/SelectInputField';

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
                category_id: {
                    placeholder: 'Selecciona una categoría',
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
            productId: null,
            productLoading: true,
            categoriesLoading: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { productId } = this.props.match.params
        if (productId !== undefined) {
            axios.get(`http://localhost:8000/api/productos/get/${productId}`).then(res => {

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
                    category_id: {
                        placeholder: 'Selecciona una categoría',
                        value: res.data.product.category_id
                    },
                }

                console.log(res.data.product);

                this.setState({
                    ...this.state,
                    'productId': productId,
                    'formControls': formControls
                });

            }).catch(err => console.log(err));
        }

        axios.get('http://localhost:8000/api/categorias/').then(res => {
            let options = [];
            res.data.categories.forEach(item => {
                const opt = {...item, displayValue: item.name, value: item.id}
                options.push(opt);
            });

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    category_id: {
                        ...this.state.formControls.category_id,
                        options: options
                    }
                }
            }, () => this.setState({ ...this.state, categoriesLoading: false }))
        });
    }

    // Handle change event in the inputs
    handleChange(event) {
        const name = event.target.name; // Input name
        let value = event.target.value; // Input value

        if (name === "category_id") {
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
        }, ()=>console.log(this.state.formControls));
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
            'category_id': Number(form.category_id.value),
            'is_available': true
        }

        console.log(product);

        if (this.state.productId !== null) {
            this.updateProduct(product)
        } else {
            this.createNewProduct(product)
        }

    }

    createNewProduct(product) {
        // Send the data to the api and create a new product
        axios.post('http://localhost:8000/api/productos/', { product }).then(res => {
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
        axios.put(`http://localhost:8000/api/productos/${this.state.productId}`, { product }).then(res => {
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

                                <div className="form-group">
                                    <SelectInputField name="category_id"
                                        value={this.state.formControls.category_id.value}
                                        onChange={this.handleChange}
                                        placeholder={this.state.formControls.category_id.placeholder}
                                        loading={this.state.categoriesLoading}
                                        options={this.state.formControls.category_id.options} />
                                </div>

                                {
                                    this.state.handleErrors.exist ? <h1>Hay errores</h1> : ''
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

export default ProductForm
