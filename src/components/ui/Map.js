import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { requestGeolocationPermission } from '../../util/permissions';
import { getAddressByCoordinates } from '../../services/google-maps.api';

export default function Map() {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });
    const [address, setAdress] = useState(null);

    useEffect(() => {
        async function getCurrentPosition() {
            const hasGeolocationPermission = await requestGeolocationPermission();
            if (hasGeolocationPermission) {
                Geolocation.getCurrentPosition(({ coords }) => {
                    setRegion({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.012,
                        longitudeDelta: 0.012,
                    });
                    setMarkerCoordinate({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    });
                })
            }
        }

        getCurrentPosition();
    }, []);

    async function onMapClicked({ nativeEvent }) {
        setMarkerCoordinate(current => ({
            ...current,
            ...nativeEvent.coordinate
        }))
        
        const formatted_address = await getAddressByCoordinates(nativeEvent.coordinate.latitude, nativeEvent.coordinate.longitude);
        setAdress(formatted_address);
    }

    return (
        <View style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                region={region}
                onPress={onMapClicked}
            >
                <Marker
                    coordinate={markerCoordinate}
                    title="some random title"
                />
            </MapView>
            {address &&
                <View style={styles.addressInfoContainer}>
                    <Text style={styles.addressInfoText}>{address}</Text>
                </View> 
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    addressInfoContainer: {
        position: 'absolute',
        bottom: 5,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 8,
        elevation: 3,
        overflow: 'hidden'
    },
    addressInfoText: {
        fontSize: 12,
        fontWeight: 'bold',
    }
});