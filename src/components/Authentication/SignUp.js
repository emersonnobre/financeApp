import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

import Button from '../ui/Button';
import Input from '../ui/Input';
import Divisor from '../ui/Divisor';
import AlternativesAuthentication from './AlternativesAuthentication';

import { GlobalStyles } from '../../constants/styles';

import { signup } from '../../services/api';

export default function SignUp({ onAuthenticationSuccess }) {
    const [formData, setFormData] = useState({
        name: { value: '', isValid: true, errorMessage: null },
        email: { value: '', isValid: true, errorMessage: null },
        password: { value: '', isValid: true, errorMessage: null },
        passwordConfirmation: { value: '', isValid: true, errorMessage: null },
    });

    function onInputValueChange(inputKey, value) {
        setFormData(currentData => ({
            ...currentData,
            [inputKey]: { value: value, isValid: true },
        }));
    }

    function submitFormDataHandler() {
        const validName = !!formData.name.value;
        const validEmail = !!formData.email.value;
        const validPassword = !!formData.password.value;
        const validPasswordConfirmation = formData.passwordConfirmation.value === formData.password.value;

        if (!validEmail || !validPassword || !validName || !validPasswordConfirmation) {
            setFormData({
                name: { ...formData.name,  isValid: validName, errorMessage: validName ? null : 'Please enter your full name!' },
                email: { ...formData.email,  isValid: validEmail, errorMessage: validEmail ? null : 'Please enter a valid e-mail address!' },
                password: { ...formData.password,  isValid: validPassword, errorMessage: validPassword ? null : 'Please enter a password!' },
                passwordConfirmation: { 
                    ...formData.passwordConfirmation,  
                    isValid: validPasswordConfirmation, 
                    errorMessage: validPasswordConfirmation ? null : 'Password confirmation must match password!' 
                },
            });
            return;
        }

        signup();
        onAuthenticationSuccess(formData.email.value, formData.name.value, formData.email.value + formData.name.value);
    }

    return (
        <View style={styles.container}>
            <View style={styles.fields}>
                <Input label='Full name' 
                    inputStyle={styles.input}
                    inputOptions={{
                        onChangeText: onInputValueChange.bind(this, 'name'),
                        value: formData.name.value,
                        autoCorrect: false,
                    }}
                    invalid={!formData.name.isValid}
                    validationErrorMessage={formData.name.errorMessage}
                />
                <Input label='E-mail' 
                    inputStyle={styles.input}
                    inputOptions={{ 
                        onChangeText: onInputValueChange.bind(this, 'email'),
                        value: formData.email.value,
                        autoCorrect: false,
                    }}
                    invalid={!formData.email.isValid}
                    validationErrorMessage={formData.email.errorMessage}
                />
                <Input label='Password'
                    inputStyle={styles.input}
                    inputOptions={{ 
                        onChangeText: onInputValueChange.bind(this, 'password'),
                        value: formData.password.value,
                        secureTextEntry: true,
                    }}
                    invalid={!formData.password.isValid}
                    validationErrorMessage={formData.password.errorMessage}
                />
                <Input label='Confirm password'
                    inputStyle={styles.input}
                    inputOptions={{ 
                        onChangeText: onInputValueChange.bind(this, 'passwordConfirmation'),
                        value: formData.passwordConfirmation.value,
                        secureTextEntry: true,
                    }}
                    invalid={!formData.passwordConfirmation.isValid}
                    validationErrorMessage={formData.passwordConfirmation.errorMessage}
                />
            </View>
            <Button color='#e91' onPress={submitFormDataHandler}>Register</Button>
            <Divisor>Or register with</Divisor>
            <AlternativesAuthentication />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%' },
    fields: { marginBottom: 10, },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.grey300
    },
});