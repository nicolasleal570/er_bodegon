import React from 'react'

function TextInputField(props) {
    return (
        <div className="form-group">
            <input {...props} className="form-control" />
        </div>
    );
}

export default TextInputField
