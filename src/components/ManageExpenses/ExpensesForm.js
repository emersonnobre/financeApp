import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from '../ui/Input';
import { GlobalStyles } from '../../constants/styles';
import ImagePicker from '../ui/ImagePicker';
import IconButton from '../ui/IconButton';
import Map from '../ui/Map';
import CustomDatePicker from '../ui/DatePicker';

export default function ExpensesForm({ onSubmit, defaultValues, }) {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
        date: { value: defaultValues ? defaultValues.date : new Date(), isValid: true },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true },
        expensePicture: { value: defaultValues ? defaultValues.expensePicture : null, isValid: true },
        location: defaultValues?.location ? { ...defaultValues.location } : null,
    });

    useEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton 
				onPress={submitFormDataHandler} 
				icon='save'
				size={24} 
				color={tintColor}
			/>
        });
    }, [navigation, submitFormDataHandler])

    function onInputValueChange(inputKey, value) {
        setFormData(currentData => ({
            ...currentData,
            [inputKey]: { value: value, isValid: true },
        }));
    }

    function onChangeDate(date) {
        setFormData(currentData => ({
            ...currentData,
            date: { value: date, isValid: true },
        }));
    }

    function submitFormDataHandler() {
        const expense = {
            description: formData.description.value,
            date: formData.date.value,
            amount: +formData.amount.value,
            expensePicture: formData.expensePicture.value,
            location: formData.location ? { ...formData.location } : null,
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
                ...currentData,
                amount: { value: currentData.amount.value, isValid: amoutIsValid },
                date: { value: currentData.date.value, isValid: dataIsValid },
                description: { value: currentData.description.value, isValid: descriptionIsValid },
            }));
             
            return false;
        }

        return true;
    }

    function onPickImage(imageUri) {
        setFormData(currentData => ({
            ...currentData,
            expensePicture: { value: imageUri, isValid: true, },
        }));
    }

    function onChangeLocation(latitude, longitude) {
        setFormData(currentData => ({
            ...currentData,
            location: { latitude, longitude, }
        }));
    }

    return (
        <View style={styles.container}>
            <Input 
                label='Description'
                inputOptions={{
                    maxLength: 500,
                    multiline: true,
                    onChangeText: onInputValueChange.bind(this, 'description'),
                    value: formData.description.value
                }}
                invalid={!formData.description.isValid}
            />
            <View style={styles.rowFlex}>
                <Input
                    label='Amount (R$)'
                    style={[styles.inputRowFlex, { marginRight: 5, }]}
                    inputOptions={{
                        maxLength: 8,
                        keyboardType: 'decimal-pad',
                        onChangeText: onInputValueChange.bind(this, 'amount'),
                        value: formData.amount.value,
                    }}
                    invalid={!formData.amount.isValid}
                />
                <CustomDatePicker 
                    label='Date' 
                    style={[styles.inputRowFlex, { marginLeft: 5, }]} 
                    initialValue={formData.date.value != '' ? formData.date.value : null}
                    onConfirm={onChangeDate} 
                />
            </View>
            <Map onSetLocation={onChangeLocation} initialLocation={formData.location} />
            <ImagePicker onPickImage={onPickImage} imageUri={formData.expensePicture.value} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowFlex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    inputRowFlex: {
        flex: 1,
    },
    errorMessage: {
        color: GlobalStyles.colors.red500,
    },
});