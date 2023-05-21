import { Pressable, View, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function IconButton({ icon, size, color, onPress = () => {} }) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => pressed && styles.pressed }
		>
			<View style={styles.iconContainer}>
				<Icon name={icon} size={size} color={color} />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		marginHorizontal: 8,
		marginVertical: 2,
	},
	pressed: {
		opacity: .75,
	},
});
