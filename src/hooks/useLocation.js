import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ck_location';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function writeStorage(loc) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  } catch {}
}

export function useLocation() {
  const [location, setLocationState] = useState(null);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    const saved = readStorage();
    if (saved) {
      setLocationState(saved);
    } else {
      setPickerOpen(true);
    }
  }, []);

  const setLocation = useCallback((loc) => {
    setLocationState(loc);
    writeStorage(loc);
    setPickerOpen(false);
    setGeoError(null);
  }, []);

  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: 'Current location',
        });
      },
      (err) => {
        setGeoLoading(false);
        if (err.code === 1) {
          setGeoError('Location access denied. Enter your pincode instead.');
        } else if (err.code === 3) {
          setGeoError('Location request timed out. Try again or enter your pincode.');
        } else {
          setGeoError('Could not get your location. Enter your pincode instead.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, [setLocation]);

  const openPicker = useCallback(() => setPickerOpen(true), []);
  const closePicker = useCallback(() => {
    if (location) setPickerOpen(false);
  }, [location]);

  return {
    location,
    setLocation,
    isPickerOpen,
    openPicker,
    closePicker,
    geoLoading,
    geoError,
    requestGeolocation,
  };
}
