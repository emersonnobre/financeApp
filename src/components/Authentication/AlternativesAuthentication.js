import { View, StyleSheet } from 'react-native';

import Button from '../ui/Button';
import google from '../../../assets/icons/google';
import facebook from '../../../assets/icons/facebook';

import { GlobalStyles } from '../../constants/styles';

export default function AlternativesAuthentication() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button 
                xml={google}
                style={{ 
                    button: styles.alternativeLoginButton, 
                    text: styles.alternativeLoginButtonText 
                }}
            >
                Google
            </Button>
            <Button 
                xml={facebook}
                style={{ 
                    button: styles.alternativeLoginButton, 
                    text: styles.alternativeLoginButtonText 
                }}
            >
                Facebook
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    alternativeLoginButton: { 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: GlobalStyles.colors.grey300,
        padding: 14,
        minWidth: '45%',
    },
    alternativeLoginButtonText: {
        color: GlobalStyles.colors.grey500,
        fontWeight: 'bold'
    }
});