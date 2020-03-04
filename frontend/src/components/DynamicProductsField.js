import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';

const DynamicProductsField = (props) => {

    const [inputFields, setInputFields] = useState([
        { productId: '', cantidad: '' }
    ]);

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "productId") {
            values[index].productId = Number(event.target.value);
        } else {
            values[index].cantidad = Number(event.target.value);
        }

        setInputFields(values);
        props.setSelectedProducts(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ productId: '', cantidad: '' });
        setInputFields(values);
        props.setSelectedProducts(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
        props.setSelectedProducts(values);
    };

    return (
        <>
            {/* <small>
                {JSON.stringify(inputFields, null, 2)}
            </small> */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Selecciona los productos para la compra</h2>
                </div>
                <div className="card-body">
                    <div className="form-row">
                        {inputFields.map((inputField, index) => (
                            <Fragment key={`${inputField}~${index}`}>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="productId">Selecciona un producto</label>
                                    <select
                                        className="form-control"
                                        id="productId"
                                        name="productId"
                                        value={inputField.productId}
                                        onChange={event => handleInputChange(index, event)}>
                                        <option value="">Selecciona un producto</option>
                                        {
                                            props.options.map(product => (
                                                <option value={product.value} key={product.value}>{product.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="cantidad">Cantidad del producto</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="cantidad"
                                        name="cantidad"
                                        value={inputField.cantidad}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-2">
                                    {index <= 0 ? '' : <button
                                        className="btn btn-primary mr-2"
                                        type="button"
                                        onClick={() => handleRemoveFields(index)}
                                    > - </button>}
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => handleAddFields()}
                                    > + </button>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className="card-footer">
                    <Link className="btn btn-primary" to="/new/producto">Crear Nuevo Producto</Link>
                </div>
            </div>
        </>
    )
}

export default DynamicProductsField
