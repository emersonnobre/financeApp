import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Button from './Button';

export default function ListWithActions({ actions = [ { label: '', iconName: '', action: () => {} } ], iconStyle, labelStyle, containerStyle = {} }) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={containerStyle}>
            {actions.map((action, index) => {
                return (
                    <View key={index} style={styles.itemContainer}>
                        <Pressable style={({ pressed }) => pressed && styles.pressed}>
                            <Button 
                                onPress={action.action} 
                                iconName={action.iconName}
                                iconOptions={{ size: iconStyle?.size, color: iconStyle?.color }}
                                style={{ 
                                    text: [styles.textButton, labelStyle], 
                                    button: styles.buttonContainer, 
                                    container: styles.container, 
                                    buttonPressed: styles.buttonPressed 
                                }}
                            >
                                {action.label}
                            </Button>
                        </Pressable>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        padding: 15,
    },
    buttonPressed: {
        borderRadius: 0,
    },
    textButton: {
        marginLeft: 10,
    },
});