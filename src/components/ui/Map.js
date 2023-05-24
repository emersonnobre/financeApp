import { useState } from 'react';
import MapView from 'react-native-maps';

export default function Map() {
    const [region, setRegion] = useState({});

    function onRegionChange(region) {
        setRegion(region);
    }

    return (
        <MapView 
            onRegionChange={onRegionChange}
        />
    );
}