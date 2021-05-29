import './Field.scss';
import React from "react";

type fieldP = {
    label: string,
    children: React.ReactNode,
    error?: string
}

export const Field =  ({label, children, error} : fieldP) => {
    return <div className={'field' + (error ? ' field_error' : '')}>
        <label className={'field__label'}>{label}</label>
        {children}
        {
            error && <ErrorMessage message={error} />
        }
    </div>
}

const ErrorMessage = ({message} : {message: string}) => {
    return <div className={'error'}>{message}</div>
}