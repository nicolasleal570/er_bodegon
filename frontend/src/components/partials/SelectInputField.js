import React from 'react'

function SelectInputField(props) {
    return (
        <div className="form-group">
            <select className="form-control" value={props.value} onChange={props.onChange} name={props.name}>
                <option>{props.placeholder}</option>
                {props.loading ? 'Loading...' : props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectInputField
