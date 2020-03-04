import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';

const DynamicPagosField = (props) => {

    const [inputFields, setInputFields] = useState([
        { facturaId: '' }
    ]);

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "facturaId") {
            values[index].facturaId = Number(event.target.value);
        }

        setInputFields(values);
        props.setSelectedPagos(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ facturaId: '' });
        setInputFields(values);
        props.setSelectedPagos(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
        props.setSelectedPagos(values);
    };

    return (
        <>
            {/* <small>
                {JSON.stringify(inputFields, null, 2)}
            </small> */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Selecciona los pagos para la compra</h2>
                </div>
                <div className="card-body">
                    <div className="form-row">
                        {inputFields.map((inputField, index) => (
                            <Fragment key={`${inputField}~${index}`}>
                                <div className="form-group col-sm-10">
                                    <label htmlFor="facturaId">Selecciona un pago</label>
                                    <select
                                        className="form-control"
                                        id="facturaId"
                                        name="facturaId"
                                        value={inputField.facturaId}
                                        onChange={event => handleInputChange(index, event)}>
                                        <option value="">Selecciona un pago</option>
                                        {
                                            props.options.map(product => (
                                                <option value={product.value} key={product.value}>{product.label}</option>
                                            ))
                                        }
                                    </select>
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
                    <Link className="btn btn-primary" to="/new/producto">Crear Nuevo Pago</Link>
                </div>
            </div>
        </>
    )
}

export default DynamicPagosField
