import React from 'react';

const Alert = ({type_message , title , message }) => {
    return (
        <div>
            { title }
            { message }
        </div>
    )
}

export default Alert
