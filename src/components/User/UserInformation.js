import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalStyles } from '../../constants/styles';

export default function UserInformation() {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.presentationContainer}>
                <View style={styles.photoContainer}>
                    <Image style={styles.photo} source={{ uri: 'https://avatars.githubusercontent.com/u/67562299?s=400&u=4f8d9c215ad204f269c4af6840e1b436fc10f007&v=4', }} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Emerson Gabriel Rocha Nobre</Text>
                    <Text>Active since Aug 2018</Text>
                </View>
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.contactText}><Icon name='mail-outline' />   egrnobre@gmail.com</Text>
                <Text style={styles.contactText}><Icon name='call-outline' />   +55 (00) 00000-0000</Text>
            </View>
            <View style={styles.resumeContainer}>
                <View style={styles.resumeItem}>
                    <Text style={styles.contactText}>Number of registers</Text>
                    <Text style={[styles.contactText, styles.resumeNumber]}>128</Text>
                </View>
                <View style={styles.resumeItem}>
                    <Text style={styles.contactText}>Total costs</Text>
                    <Text style={[styles.contactText, styles.resumeNumber]}>R$ 28.000,12</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    presentationContainer: {
        flexDirection: 'row',
        padding: 28,
        flex: 2,
    },
    photoContainer: {
        flex: 1,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    nameContainer: {
        justifyContent: 'center',
        flex: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary600
    },
    contactContainer: {
        padding: 24,
        flex: 1,
    },
    contactText: {
        fontWeight: 'bold',
    },
    resumeContainer: {
        flexDirection: 'row',
        flex: 2,
    },
    resumeItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.2,
        borderRightWidth: .5,
        borderColor: GlobalStyles.colors.grey300
    },
    resumeNumber: {
        fontSize: 28,
        color: GlobalStyles.colors.primary600
    }
});