import { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import SignIn from '../components/Authentication/SignIn';
import Title from '../components/ui/Title';
import TextLink from '../components/ui/TextLink';
import SignUp from '../components/Authentication/SignUp';

import { GlobalStyles } from '../constants/styles';
import { AuthContext } from '../store/auth.context';

export default function Authentication() {
    const { authenticate: authenticateInContext } = useContext(AuthContext);
    const [mode, setMode] = useState('signin');

    function switchMode() {
        if (mode == 'signin')
            setMode('signup');
        else
            setMode('signin');
    }

    function authenticate(email, name, token) {
        authenticateInContext(name, email, token);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Title textStyle={styles.textTitleContainer}>Sign in to your account</Title>
                <Title textStyle={styles.textSubtitleContainer}>Or create a new one</Title>
            </View>
            <View style={styles.authenticationContainer}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}>
                    <View style={styles.innerAuthenticationContainer}>
                        { mode == 'signin' && <SignIn onAuthenticationSuccess={authenticate} /> }
                        { mode == 'signup' && <SignUp onAuthenticationSuccess={authenticate} /> }
                        <View style={styles.signUpContainer}>
                            <Text>{ mode == 'signin' ? 'Are you new here? ' : 'Already have an account? ' }</Text>
                            <TextLink onPress={switchMode}>{ mode == 'signin' ? 'Sign Up' : 'Sign In' }</TextLink>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        backgroundColor: GlobalStyles.colors.primary800,
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end'
    },
    authenticationContainer: {
        flex: 3,
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    innerAuthenticationContainer: {
        justifyContent: 'space-between',
        flex: 1,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
    },
    textTitleContainer: {
        color: 'white',
        fontSize: 28,
    },
    textSubtitleContainer: {
        color: '#eea',
        fontSize: 18,
    },
});