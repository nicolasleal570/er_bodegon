import React, { Component } from 'react'
import axios from 'axios'
import SelectInputField from '../partials/SelectInputField';
import { Link } from 'react-router-dom';
import DynamicProductsField from '../DynamicProductsField';
import DynamicPagosField from '../DynamicPagosField';

export class VentaForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formControls: {
                cliente: {
                    value: '',
                    placeholder: 'Selecciona un cliente',
                    options: []
                },
                productos: [{ productId: '', cantidad: '' }],
                pago: {
                    value: '',
                    placeholder: 'Selecciona el pago realizado.',
                    options: []
                },
                delivery: {
                    value: '',
                    placeholder: 'Selecciona el delivery.',
                    options: [
                        { value: 'delivery 0', displayValue: 'CCS' },
                    ]
                },
                total: 0,
            },
            selectProductsOptions: [],
            selectPagosOptions: [],
            clientesLoading: true,
            productosLoading: true,
            pagosLoading: true,
            deliveryLoading: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // GET CLIENTES AND SET OPTIONS SELECT FIELD
        axios.get('http://localhost:8000/api/clientes/').then(res => {
            axios.get('http://localhost:8000/api/usuarios/').then(respon => {
                const clientes = res.data.clientes;
                const usuarios = respon.data.usuarios;
                const options = [];

                clientes.forEach(item => {
                    const usuario = usuarios.find(user => user.id === item.usuario_id);
                    const option = {
                        value: item.id,
                        displayValue: usuario.name
                    }

                    options.push(option);
                });

                this.setState({
                    ...this.state,
                    formControls: {
                        ...this.state.formControls,
                        cliente: {
                            ...this.state.formControls['clientes'],
                            options
                        }
                    }
                }, () => this.setState(
                    {
                        ...this.state,
                        'clientesLoading': false
                    }
                ));
            });
        });

        axios.get('http://localhost:8000/api/productos/').then(res => {

            let options = [];
            res.data.products.forEach(item => {
                const opt = {
                    value: item.id,
                    label: item.name,
                    ...item
                }
                options.push(opt);
            });

            this.setState({
                ...this.state,
                selectProductsOptions: options
            }, () => this.setState({ ...this.state, productosLoading: false }));
        });

        axios.get('http://localhost:8000/api/pagos/').then(res => {

            let options = [];
            res.data.pagos.forEach(item => {
                const opt = {
                    value: item.id,
                    label: `Pago por: ${item.mount}`,
                    ...item
                }
                options.push(opt);
            });

            this.setState({
                ...this.state,
                selectPagosOptions: options
            }, () => this.setState({ ...this.state, pagosLoading: false }));
        });

        axios.get('http://localhost:8000/api/delivery/').then(res => {

            let options = [];

            res.data.deliveries.forEach((item, index) => {
                let opt = {
                    value: Number(item.id),
                    displayValue: `${index + 1}.- Direccion: ${item.direction}`
                }
                options.push(opt);
            });

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    delivery: {
                        ...this.state.formControls.delivery,
                        options: options
                    }
                }
            }, () => {
                console.log(this.state.formControls);
                this.setState({
                    ...this.state,
                    deliveryLoading: false
                });
            })
        });
    }

    handleChange(event) {
        let name = event.target.name; // Input name
        let value = event.target.value; // Input value

        if (name === "cliente" || name === "pago") {
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

    handleSubmit(event) {
        event.preventDefault();
    }

    setSelectedProducts(inputFields) {
        this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                productos: inputFields
            }
        }, () => {
            let total = 0;

            this.state.selectProductsOptions.forEach(producto => {
                this.state.formControls.productos.forEach(item => {
                    if (producto.id === item.productId) {
                        const descuento = producto.descuento !== 0 ? (producto.descuento / 100) : 1;
                        const newPrice = producto.costo * item.cantidad * descuento;
                        total += newPrice;
                    }
                });
            });

            localStorage.setItem("totalVenta", total);

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    total
                }
            }, () => console.log(this.state));


        });
    }

    setSelectedPagos(inputFields) {
        this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                pago: inputFields
            }
        }, () => {
            let total = 0;

            this.state.selectProductsOptions.forEach(producto => {
                console.log(producto);
                this.state.formControls.pago.forEach(item => {
                    if (producto.id === item.productId) {
                        const descuento = producto.descuento !== 0 ? (producto.descuento / 100) : 1;
                        const newPrice = producto.costo * item.cantidad * descuento;
                        total += newPrice;
                    }
                });
            });

            localStorage.setItem("totalVenta", total);

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    total
                }
            }, () => console.log(this.state));


        });
    }

    render() {
        return (
            <div className="container mt-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        {/* SELECCIONAR EL CLIENTE */}
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">Selecciona el usuario para la factura</h2>
                                </div>
                                <div className="card-body">
                                    <SelectInputField name="cliente"
                                        value={this.state.formControls.cliente.value}
                                        onChange={this.handleChange}
                                        placeholder={this.state.formControls.cliente.placeholder}
                                        loading={this.state.clientesLoading}
                                        options={this.state.formControls.cliente.options} />
                                </div>
                                <div className="card-footer">
                                    <Link className="btn btn-primary" to="/new/usuario">Crear Usuario Nuevo</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        {/* PRODUCTOS DEL USUARIO */}
                        <div className="col-md-12">
                            <DynamicProductsField options={this.state.selectProductsOptions} setSelectedProducts={(inputFields) => this.setSelectedProducts(inputFields)} />
                        </div>
                    </div>
                    <div className="row">
                        {/* DELIVERY DEL USUARIO */}
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">Selecciona un delivery</h2>
                                    <small>Selecciona el delivery a ser realizado. (En caso de que haha sido solicitado)</small>
                                </div>
                                <div className="card-body">
                                    <SelectInputField name="delivery"
                                        value={this.state.formControls.delivery.value}
                                        onChange={this.handleChange}
                                        placeholder={this.state.formControls.delivery.placeholder}
                                        loading={this.state.deliveryLoading}
                                        options={this.state.formControls.delivery.options} />

                                </div>
                                <div className="card-footer">
                                    <Link className="btn btn-primary" to="/new/usuario">Crear Delivery</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row my-4">
                        {/* PAGOS DEL USUARIO */}
                        <div className="col-md-12">
                            <DynamicPagosField options={this.state.selectPagosOptions} setSelectedPagos={(inputFields) => this.setSelectedPagos(inputFields)} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default VentaForm
