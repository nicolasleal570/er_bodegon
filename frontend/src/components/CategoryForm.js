import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SelectInputField from './partials/SelectInputField';

import TextInputField from './partials/TextInputField';
import ErrorHandlerAler from './partials/ErrorHandlerAler'

export class CategoryForm extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                name: {
                    placeholder: 'Inserta el nombre de la categoria',
                    type: 'number',
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

        const category = {
            'name': form.name.value,
            'is_available': true
        }

        this.createNewProduct(category)

    }

    createNewProduct(category) {
        // Send the data to the api and create a new category
        axios.post('http://localhost:8000/api/categorias/', { category }).then(res => {
            console.log(res.data);
            this.setState({ redirect: "/categorias" });
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
                    <h3>Crear Categoria</h3>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} className="form-group">
                                <TextInputField name="name"
                                    placeholder={this.state.formControls.name.placeholder}
                                    value={this.state.formControls.name.value}
                                    onChange={this.handleChange} />

                                {
                                    this.state.handleErrors.exist ? <ErrorHandlerAler errors={this.state.handleErrors.errors} keys={['name']} /> : ''
                                }
                                <input type="submit" value="Guardar Categoria" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryForm
