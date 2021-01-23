import React from 'react';
import { Typography, TextField, Button } from 'rmwc';
import Message from '../Message';
import { IForm } from './Form.model';

import './Form.scss'

const Form = (props: IForm) => (
    <form className="form" onSubmit={props.onSubmit}>
        <div className="form__body">
            <Typography className="form__title" use="headline3">{props.title}</Typography>

            {
                props.rows.map((row, index) => (
                    <div key={index} className="form__row">
                        <TextField
                            type={row.inputType}
                            name={row.name}
                            onChange={props.onChange}
                            className="form__text-field"
                            placeholder={row.placeHolder}
                        />
                    </div>
                ))
            }

            <Button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
            >
                {props.buttonText}
            </Button>
            {props.message && <Message message={props.message} />}
        </div>
    </form>
)

export default Form;