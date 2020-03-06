import React, { Component } from 'react'
import axios from 'axios'
import SelectInputField from './partials/SelectInputField';
import { Link } from 'react-router-dom';
import DynamicProductsField from './DynamicProductsField';
import DynamicPagosField from './DynamicPagosField';
import TextInputField from './partials/TextInputField';
import ErrorHandlerAler from './partials/ErrorHandlerAler'

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
                codigo: {
                    placeholder: 'Codigo de la nueva factura',
                    type: 'text',
                    value: ''
                },
                productos: [{ productId: '', cantidad: '' }],
                pago: [],
                divisa_id: {
                    placeholder: 'Selecciona la divisa',
                    options: [],
                    value: ''
                },
                instrumento_id: {
                    placeholder: 'Selecciona la divisa',
                    options: [],
                    value: ''
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
            handleErrors: {
                exist: false,
                errors: {
                    name: [],
                    description: [],
                }
            },
            selectProductsOptions: [],
            selectPagosOptions: [],
            facturaId: null,
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

        axios.get('http://localhost:8000/api/entregas/').then(res => {

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

        this.getPagosSchema();
    }

    getPagosSchema() {
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

    handleChange(event) {
        let name = event.target.name; // Input name
        let value = event.target.value; // Input value

        if (name === "cliente" || name === "pago" || name === "codigo") {
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
        });
    }

    handleSubmit(event) {
        const name = event.target.name;
        let value = event.target.value;
        event.preventDefault();

        console.log(this.state.formControls);

        const codigo = this.state.formControls.codigo.value;
        const clientId = this.state.formControls.cliente.value;
        const productos = this.state.formControls.productos;
        const pagos = this.state.formControls.pago;
        const deliveryId = Number(this.state.formControls.delivery.value);
        const total = this.state.formControls.total;

        const factura = {
            total,
            codigo,
            'delivery_id': deliveryId,
            'cliente_id': clientId,
            'is_available': true
        }

        axios.post('http://localhost:8000/api/facturas/', { factura }).then(res => {
            const facturaId = res.data.factura.id;

            pagos.forEach(pago => {
                let newPago = {
                    divisa_id: pago.divisaId,
                    instrumento_id: pago.instrumentoId,
                    mount: pago.mount,
                    factura_id: facturaId,
                    is_available: true
                }
                axios.post('http://localhost:8000/api/pagos/', { 'pago': newPago }).then(respon => {
                    console.log(respon.data);
                });
            });

            productos.forEach(producto => {
                let price = 0;
                this.state.selectProductsOptions.forEach(prod => {
                    if (prod.id === producto.productId) {
                        price = prod.costo;
                        return;
                    }
                });

                const newFactDetail = {
                    price_per_unit: price,
                    iva: 1.25,
                    quantity: producto.cantidad,
                    factura_id: facturaId,
                    product_id: producto.productId,
                    is_available: true
                }

                axios.post('http://localhost:8000/api/facturas/detalle/', { 'factura_detail': newFactDetail }).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    const errors = {
                        exist: true,
                        errors: err.response.data
                    };
                    this.setState({
                        ...this.state,
                        handleErrors: errors
                    });
        
                    console.log(this.state.handleErrors);
                });
            });


        }).catch(err => {
            const errors = {
                exist: true,
                errors: err.response.data
            };
            this.setState({
                ...this.state,
                handleErrors: errors
            });

            console.log(this.state.handleErrors);
        });


    }

    setSelectedProducts(inputFields) {
        this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                productos: inputFields
            }
        }, () => {
            let total = this.state.formControls.total;

            this.state.selectProductsOptions.forEach(producto => {
                this.state.formControls.productos.forEach(item => {
                    if (producto.id === item.productId) {
                        const descuento = producto.descuento !== 0 ? (producto.descuento / 100) : 1;
                        const newPrice = producto.costo * item.cantidad * descuento;
                        total += newPrice;
                    }
                });
            });

            this.setState({
                ...this.state,
                formControls: {
                    ...this.state.formControls,
                    total
                }
            });


        });
    }

    setSelectedPagos(inputFields) {
        this.setState({
            ...this.state,
            formControls: {
                ...this.state.formControls,
                pago: inputFields
            }
        });

    }

    render() {
        return (
            <div className="container mt-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">Inserta el codigo para la nueva factura</h2>
                                </div>
                                <div className="card-body">
                                    <TextInputField name="codigo"
                                        placeholder={this.state.formControls.codigo.placeholder}
                                        value={this.state.formControls.codigo.value}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>


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
                                    <Link className="btn btn-primary" to="/new/cliente">Crear Nuevo Cliente</Link>
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
                                    <Link className="btn btn-primary" to="/new/delivery">Crear Delivery</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row my-4">
                        {/* PAGOS DEL USUARIO */}
                        <div className="col-md-12">
                            <DynamicPagosField
                                mount={this.state.formControls.total}
                                options={this.state.selectPagosOptions}
                                divisas={this.state.formControls.divisa_id}
                                facturaId={this.state.facturaId}
                                instrumentos={this.state.formControls.instrumento_id}
                                setSelectedPagos={(inputFields) => this.setSelectedPagos(inputFields)} />
                        </div>
                    </div>
                    <div className="row-mt-4">
                        <div className="col-md-12">
                            {
                                this.state.handleErrors.exist ? <ErrorHandlerAler errors={this.state.handleErrors.errors} keys={['cliente_id', 'codigo', 'productos', 'pago', 'divisa_id', 'instrumento_id', 'delivery', 'total']} /> : ''
                            }
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <input type="submit" value="Crear venta" className="btn btn-primary btn-block" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default VentaForm
