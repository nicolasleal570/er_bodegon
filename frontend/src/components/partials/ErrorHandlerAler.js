import React from 'react'

function ErrorHandlerAler(props) {
    return (
        <div className="alert alert-danger">
            {props.keys.map((key, index) => {
            
                return <p key={index}>
                    <span className="font-weight-bold">{key.toUpperCase()}:</span> {props.errors[key]}
                </p>
            })
            }
        </div>
    )
}

export default ErrorHandlerAler
