import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { GlobalStyles } from '../../constants/styles';

export default function TextLink({ children, onPress = () => {}, style = {}, textStyle = {}, iconName }) {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.innerContainer, style]}>
                {iconName &&
                    <View style={styles.iconContainer}>
                        <Icon name={iconName} size={20} color={GlobalStyles.colors.primary500} />
                    </View>
                }
                <Text style={[styles.textLink, textStyle]}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        marginRight: 12,
    },
    textLink: {
        color: GlobalStyles.colors.primary700,
        fontWeight: 'bold'
    }
});