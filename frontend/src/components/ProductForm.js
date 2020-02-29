import React, { Component } from 'react'
import axios from 'axios';

function TextInput(props) {
    return (
        <div>
            <input type="text" {...props} />
        </div>
    );
}

export class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                name: {
                    placeholder: 'Insert the name',
                    value: ''
                },
                description: {
                    placeholder: 'Insert the description',
                    value: ''
                }
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

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

    handleSubmit(event) {
        event.preventDefault();
        
        const form = this.state.formControls;

        const product = {
            'name': form.name.value,
            'description': form.description.value,
        }

        // Send the data to the api and create a new product
        axios.post('http://localhost:8000/api/products/', { product }).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err));

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextInput name="name"
                    placeholder={this.state.formControls.name.placeholder}
                    value={this.state.formControls.name.value}
                    onChange={this.handleChange} />
                <TextInput name="description"
                    placeholder={this.state.formControls.description.placeholder}
                    value={this.state.formControls.description.value}
                    onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default ProductForm
