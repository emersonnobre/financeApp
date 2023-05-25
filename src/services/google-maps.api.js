export async function getAddressByCoordinates(lat, lng) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${'AIzaSyAY5D1YT42zz742iriWTj_mZ0vYuMWV1KM'}`;
    try {
        const response = await fetch(apiUrl);
        const jsonResponse = await response.json();
        return jsonResponse.results[0].formatted_address;
    } catch(err) {
        if (__DEV__) console.log('[google-maps.api][getAddressByCoordinates]', err);
        return null;
    }
}