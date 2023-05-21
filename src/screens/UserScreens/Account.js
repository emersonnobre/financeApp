import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { AuthContext } from '../../store/auth.context';
import Button from '../../components/ui/Button';
import { GlobalStyles } from '../../constants/styles';
import ListWithActions from '../../components/ui/ListWithActions';

const accountOptions = [
    { label: 'Privacy', iconName: 'lock-closed-outline', action: () => {} },
    { label: 'Share Profile', iconName: 'share-social-outline', action: () => {} },
    { label: 'Report an error', iconName: 'bug-outline', action: () => {} },
    { label: 'Settings', iconName: 'settings-outline', action: () => {} },
    { label: 'Social Media', iconName: 'people-outline', action: () => {} },
    { label: 'Favorites', iconName: 'heart-outline', action: () => {} },
];

export default function Account() {
    const { authenticatedUser } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.overviewContainer}>

            </View>
            <View style={styles.accountOptionsContainer}>
                <ListWithActions 
                    actions={accountOptions} 
                    iconStyle={{ size: 20, color: GlobalStyles.colors.primary600 }} 
                    labelStyle={{ fontSize: 15, color: GlobalStyles.colors.primary600 }} 
                />
            </View>
            <View style={styles.logoutContainer}>
                <Button 
                    style={{ 
                        button: styles.logoutButtonContainer, 
                        text: styles.logoutButtonText ,
                        buttonPressed: styles.logoutButtonPressed
                    }} 
                    iconName='log-in-outline'
                    iconOptions={{ size: 20, color: 'tomato' }}
                >
                    Log out
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overviewContainer: {
        flex: 2,
        backgroundColor: 'red'
    },
    accountOptionsContainer: {
        flex: 2,
    },
    logoutContainer: {
        flex: .3,
        justifyContent: 'center',
        borderTopWidth: .7,
        borderTopColor: GlobalStyles.colors.grey300,
    },
    logoutButtonContainer: {
        backgroundColor: 'transparent',
        alignItems: 'baseline',
        justifyContent: 'flex-start'
    },
    logoutButtonText: {
        color: 'tomato',
        fontSize: 18,
        marginLeft: 3,
    },
    logoutButtonPressed: {
        opacity: .75,
		backgroundColor: GlobalStyles.colors.grey100,
    },
});