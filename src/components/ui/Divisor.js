import { View, Text, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function Divisor({ children }) {
    return (
        <View style={styles.divisorContainer}>
            <View style={styles.line}></View>
            <Text style={styles.text}>{children}</Text>
            <View style={styles.line}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    divisorContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 30,
        flexDirection: 'row',
    },
    line: { 
        borderWidth: .6, 
        flex: 1, 
        marginHorizontal: 10, 
        borderColor: GlobalStyles.colors.grey100
    },
    text: {
        color: GlobalStyles.colors.grey300,
    },
});