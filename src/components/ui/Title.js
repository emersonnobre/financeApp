import { StyleSheet, Text, View, } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

export default function Title({ children, style = {}, textStyle = {} }) {
    return (
        <View style={style}>
            <Text style={[styles.title, textStyle]}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        color: GlobalStyles.colors.primary700,
        fontWeight: 'bold'
    }
});