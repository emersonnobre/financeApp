import { View, Text, Pressable, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';

import { GlobalStyles } from '../../constants/styles';

export default function Button({ children, onPress, mode, style = { button: {}, text: {}, container: {}, buttonPressed: {} }, iconName = null, iconOptions = {}, xml = null }) {
	return (
		<View style={style?.container}>
			<Pressable onPress={onPress} style={({ pressed }) => pressed && [styles.pressed, style.buttonPressed]}>
				<View style={[styles.buttonContainer, style?.button, mode === 'flat' && styles.buttonContainerFlat]}>
					{iconName && <Icon name={iconName} size={iconOptions.size || 10} color={iconOptions.color || 'black'} />}
					{xml && <SvgXml style={styles.iconStyle} xml={xml} width={17} height={17} />}
					<View>

					<Text style={[styles.buttonText, style?.text, mode === 'flat' && styles.buttonTextFlat]}>{children}</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 10,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: GlobalStyles.colors.primary700,
	},
	buttonText: {
		fontWeight: 'bold',
		color: 'white',
	},
	buttonContainerFlat: {
		backgroundColor: 'transparent',
	},
	buttonTextFlat: {
		color: GlobalStyles.colors.primary700,
	},
	pressed: {
		opacity: .75,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 10,
	},
	iconStyle: { 
		marginRight: 5, 
	},
});
