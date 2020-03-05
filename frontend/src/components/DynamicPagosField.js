import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';

const DynamicPagosField = (props) => {

    const [inputFields, setInputFields] = useState([
        { facturaId: '', divisaId: '', instrumentoId: '', mount: props.mount },
    ]);

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        const options = event.target.name;

        switch (options) {

            case "facturaId":
                values[index].facturaId = Number(event.target.value);
                break;
            case "divisaId":
                values[index].divisaId = Number(event.target.value);
                break;
            case "instrumentoId":
                values[index].instrumentoId = Number(event.target.value);
                break;
            case "mount":
                values[index].mount = Number(event.target.value);
                break;
        }

        setInputFields(values);
        props.setSelectedPagos(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ facturaId: '', divisaId: '', instrumentoId: '', mount: props.mount });
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
                                    <h4>Pago #{index+1}</h4>
                                    <input name="mount"
                                        className="form-control"
                                        value={inputField.mount} onChange={event => handleInputChange(index, event)}
                                        placeholder="Inserta el monto del pago"
                                         />
                                </div>
                                <div className="form-group col-sm-10">
                                    <select
                                        className="form-control"
                                        name="divisaId"
                                        value={inputField.divisaId}
                                        onChange={event => handleInputChange(index, event)}>
                                        <option value="">Selecciona la divisa de pago</option>
                                        {
                                            props.divisas.options.map(divisa => (
                                                <option value={divisa.id} key={divisa.id}>{divisa.displayValue}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-sm-10">
                                    <select
                                        className="form-control"
                                        name="instrumentoId"
                                        value={inputField.instrumentoId}
                                        onChange={event => handleInputChange(index, event)}>
                                        <option value="">Selecciona el instrumento de pago</option>
                                        {
                                            props.instrumentos.options.map(instrumento => (
                                                <option value={instrumento.id} key={instrumento.id}>{instrumento.displayValue}</option>
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
                {/* <div className="card-footer">
                    <Link className="btn btn-primary" to="/new/producto">Crear Nuevo Pago</Link>
                </div> */}
            </div>
        </>
    )
}

export default DynamicPagosField
