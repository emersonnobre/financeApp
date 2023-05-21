import { StyleSheet, Text, View } from 'react-native';

import Input from '../ui/Input';
import Button from '../ui/Button';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/styles';

export default function ExpensesForm({ onSubmit, onCancel, defaultValues, }) {
    const [formData, setFormData] = useState({
        amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
        date: { value: defaultValues ? defaultValues.date.toISOString() : '', isValid: true },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true },
    });

    function onInputValueChange(inputKey, value) {
        setFormData(currentData => ({
            ...currentData,
            [inputKey]: { value: value, isValid: true },
        }));
    }

    function submitFormDataHandler() {
        const expense = {
            description: formData.description.value,
            date: new Date(formData.date.value),
            amount: +formData.amount.value,
        };

        const formIsValid = validateForm(expense);

        if (!formIsValid) return;

        onSubmit(expense);
    }

    function validateForm(expense) {
        const dataIsValid = expense.date.toString() != 'Invalid Date';
        const descriptionIsValid = expense.description.trim().length > 0;
        const amoutIsValid = !isNaN(expense.amount) && expense.amount > 0;

        if (!dataIsValid || !descriptionIsValid || !amoutIsValid) {
            setFormData(currentData => ({
                amount: { value: currentData.amount.value, isValid: amoutIsValid },
                date: { value: currentData.date.value, isValid: dataIsValid },
                description: { value: currentData.description.value, isValid: descriptionIsValid },
            }));
             
            return false;
        }

        return true;
    }

    const formIsInvalid = Object.values(formData).some(value => !value.isValid);

    return (
        <View style={styles.container}>
            <Input 
                label='Description'
                inputOptions={{
                    maxLength: 50,
                    multiline: true,
                    onChangeText: onInputValueChange.bind(this, 'description'),
                    value: formData.description.value
                }}
                invalid={!formData.description.isValid}
            />
            <View style={styles.rowFlex}>
                <Input 
                    label='Date'
                    style={styles.inputRowFlex}
                    inputOptions={{
                        maxLength: 10,
                        placeholder: 'YYYY-MM-dd',
                        onChangeText: onInputValueChange.bind(this, 'date'),
                        value: formData.date.value
                    }}
                    invalid={!formData.date.isValid}
                />
                <Input
                    label='Amount (R$)'
                    style={styles.inputRowFlex}
                    inputOptions={{
                        keyboardType: 'decimal-pad',
                        onChangeText: onInputValueChange.bind(this, 'amount'),
                        value: formData.amount.value
                    }}
                    invalid={!formData.amount.isValid}
                />
            </View>
            {formIsInvalid && 
                <Text style={styles.errorMessage}>
                    There are some invalid answers here, please correct them to continue!
                </Text>
            }
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} onPress={onCancel} mode='flat'>Cancel</Button>
                <Button style={styles.button} onPress={submitFormDataHandler}>{defaultValues ? 'Edit' : 'Add'}</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    rowFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputRowFlex: {
        flex: 1,
        marginHorizontal: 4,
    },
    buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 16,
	},
	button: {
		minWidth: 120,
		marginHorizontal: 6,
	},
    errorMessage: {
        color: GlobalStyles.colors.red500,
    },
});