import React from 'react';
import { Colors } from 'styles';
import BaseInput from './baseTextInput/TextInput'

function TextInput(props) {
    return (
        <BaseInput
            theme={{
                roundness: 10,
                colors: {
                    disabled: '#6B6B6B54',
                    text: Colors.text,
                    primary: Colors.placeholder,
                    placeholder: Colors.placeholder,
                    backgroundColor: Colors.input
                }
            }}
            {...props} />
    )
}

export default TextInput;
