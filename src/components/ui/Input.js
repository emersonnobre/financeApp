import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { useState } from 'react';

export default function Input({ label, inputOptions = {}, style = {}, invalid = false, validationErrorMessage = null, inputStyle = {} }) {
    const [focused, setFocus] = useState(false);

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput 
                style={[
                    styles.input, 
                    focused && styles.focused, 
                    inputOptions?.multiline && styles.inputMultiline,
                    invalid && styles.invalidInput,
                    inputStyle
                ]} 
                {...inputOptions} 
                onFocus={() => setFocus(true)} 
                onBlur={() => setFocus(false)}
            />
            { invalid && <Text style={styles.errorMessage}>{validationErrorMessage}</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        color: GlobalStyles.colors.primary800,
        fontWeight: 600,
        fontSize: 13,
        marginBottom: 6,
    },
    invalidLabel: {
        color: GlobalStyles.colors.red500,
    },
    input: {
        borderBottomWidth: 1.6,
        padding: 8,
        borderRadius: 6,
        borderColor: GlobalStyles.colors.primary500,
        color: GlobalStyles.colors.primary700,
        backgroundColor: 'white',
        fontWeight: '600'
    },
    invalidInput: {
        borderColor: GlobalStyles.colors.red500,
    },
    errorMessage: {
        color: GlobalStyles.colors.red500,
    },
    focused: {
        borderColor: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 110,
        textAlignVertical: 'top',
    }
});