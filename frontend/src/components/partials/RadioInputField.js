import React from 'react'

function RadioInputField(props) {
    return (
        <div className="form-group">

            {props.options.map(option => (
                <div className="form-group" key={option.value}>
                
                    <input type="radio"
                        name={props.name}
                        value={option.value}
                        onChange={props.onChange}
                        className="form-check-input"
                    />
                    <label className="form-check-label">{option.displayValue}</label>
                </div>
            ))}

        </div>
    );
}

export default RadioInputField
