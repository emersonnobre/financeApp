import { GOOGLE_MAPS_API_KEY } from '@env';

export async function getAddressByCoordinates(lat, lng) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        const jsonResponse = await response.json();
        return jsonResponse.results[0].formatted_address;
    } catch(err) {
        if (__DEV__) console.log('[google-maps.api][getAddressByCoordinates]', err);
        return null;
    }
}