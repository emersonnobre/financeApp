import { PermissionsAndroid } from 'react-native';

export function requestGeolocationPermission() {
    const promise = new Promise((resolve, _) => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Geolocation permission',
                message: 'You need to provide access to your geolocation',
                buttonNeutral: 'Ask me later',
                buttonNegative: 'Cancel',
                buttonPositive: 'Ok'
            }
        ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                resolve(true);
            } else
                resolve(false);
        }).catch(error => {
            if (__DEV__) console.log(error);
            resolve(false);
        });
    });

    return promise;
}