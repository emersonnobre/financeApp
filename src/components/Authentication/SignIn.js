import { useState } from 'react';
import { View, StyleSheet, } from 'react-native';

import Button from '../ui/Button';
import Input from '../ui/Input';

import { signin } from '../../services/api';
import TextLink from '../ui/TextLink';
import Divisor from '../ui/Divisor';
import AlternativesAuthentication from './AlternativesAuthentication';

import { GlobalStyles } from '../../constants/styles';

export default function SignIn({ onAuthenticationSuccess }) {
    const [formData, setFormData] = useState({
        email: { value: '', isValid: true, errorMessage: null },
        password: { value: '', isValid: true, errorMessage: null }
    });

    function onInputValueChange(inputKey, value) {
        setFormData(currentData => ({
            ...currentData,
            [inputKey]: { value: value, isValid: true },
        }));
    }

    function submitFormDataHandler() {
        const validEmail = !!formData.email.value;
        const validPassword = !!formData.password.value;

        if (!validEmail || !validPassword) {
            setFormData({
                email: { ...formData.email,  isValid: validEmail, errorMessage: validEmail ? null : 'Please enter a valid e-mail address!' },
                password: { ...formData.password,  isValid: validPassword, errorMessage: validPassword ? null : 'Please enter a password!' }
            });
            return;
        }

        signin();

        const name = formData.email.value.slice(0, formData.email.value.indexOf('@'));
        onAuthenticationSuccess(formData.email.value, name, formData.email.value + name);
    }

    return (
        <View style={styles.container}>
            <View>
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
            </View>
            <TextLink style={styles.forgotPasswordContainer} textStyle={styles.forgotPasswordText}>Forgot your password?</TextLink>
            <Button color='#e91' onPress={submitFormDataHandler}>Login</Button>
            <Divisor>Or login with</Divisor>
            <AlternativesAuthentication />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%' },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.grey300
    },
    forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 20 },
    forgotPasswordText: { 
        color: '#e91',
    },
});