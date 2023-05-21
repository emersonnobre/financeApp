import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

export default function TextLink({ children, onPress = () => {}, style = {}, textStyle = {} }) {
    return (
        <Pressable onPress={onPress}>
            <View style={style}>
                <Text style={[styles.textLink, textStyle]}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    textLink: {
        color: GlobalStyles.colors.primary700,
        fontWeight: 'bold'
    }
});