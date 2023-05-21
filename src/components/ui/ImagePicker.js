import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

import Button from './Button';
import IconButton from './IconButton';
import { GlobalStyles } from '../../constants/styles';

export default function ImagePicker({ imageUri, onPickImage }) {
    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (!imageUri) return;

        RNFS.readFile(imageUri, 'base64')
            .then(base64Image => {
                setImage(base64Image);
            })
            .catch(err => {
                console.log(err);
            });
    }, [imageUri]);

    function takePictureHandler() {
        Camera.getCameraPermissionStatus()
            .then(status => {
                if (status != 'authorized') return;
                navigation.navigate('Camera', { onTakePicture: onTakePicture });
            });
    }

    function clearPictureHandler() {
        onPickImage && onPickImage(null);
        setImage(null);
    }

    function onTakePicture(imageUri) {
        onPickImage && onPickImage(imageUri);

        RNFS.readFile(imageUri, 'base64')
            .then(base64Image => {
                setImage(base64Image);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <View style={styles.imagePickerContainer}>
            {image && <Image source={{ uri: 'data:image/png;base64,' + image  }} style={styles.image} />}
            {!image && <Button 
                onPress={takePictureHandler} 
                style={{ 
                    button: [styles.takePictureButton, styles.noImagePicked], 
                    text: styles.takePictureButtonText 
                }}
            >
                Take Picture
            </Button>}
            {image && <Button 
                onPress={clearPictureHandler} 
                style={{ 
                    button: [styles.takePictureButton, styles.clearPictureButton], 
                    text: [styles.takePictureButtonText, styles.clearPictureButtonText]
                }}
            >
                Clear Picture
            </Button>}
        </View>
    );
}

export function CameraP({ route }) {
    const navigation = useNavigation();
    const { onTakePicture } = route.params || {};

    const camera = useRef(null);
    const devices = useCameraDevices();
    const device = devices.back;

    async function handlePicture() {
        const image = await camera.current.takePhoto();
        onTakePicture && onTakePicture(image.path);
        navigation.goBack();
    }

    if (!device) return;

    return (
        <View style={{ flex: 1 }}>
            <Camera 
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
            />
            <View style={styles.icon}>
                <View style={styles.innerContainerIcon}>
                    <IconButton onPress={handlePicture} icon='camera-outline' size={40} color='white' />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        width: '100%',
    },
    innerContainerIcon: {
        backgroundColor: GlobalStyles.colors.primary700,
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePickerContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    takePictureButton: { 
        height: 70, 
        borderRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary600,
    },
    clearPictureButton: {
        borderColor: GlobalStyles.colors.red300,
    },
    clearPictureButtonText: {
        color: GlobalStyles.colors.red300,
    },
    noImagePicked: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 40,
    },
    takePictureButtonText: { 
        color: GlobalStyles.colors.primary600,
    },
    image: {
        width: 70,
        height: 70,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
});