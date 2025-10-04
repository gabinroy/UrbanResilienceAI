'use server';

import axios from 'axios';

// Define the structure for coordinates
interface Coordinates {
  lat: number;
  lon: number;
}

export interface NasaPowerData {
  T2M: number; // Temperature at 2 Meters
  RH2M: number; // Relative Humidity at 2 Meters
}

// Geocoding function to get lat/lon from a city name
export async function getCoordinates(city: string): Promise<Coordinates | null> {
  try {
    // Using a free, open-source geocoding service. No API key required.
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: city,
        format: 'json',
        limit: 1,
      },
      headers: {
        'User-Agent': 'UrbanResilienceAI/1.0 (https://your-app-website.com)' // Good practice to set a User-Agent
      }
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    }
    return null;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

// Function to fetch data from NASA POWER API
export async function getNasaPowerData(lat: number, lon: number): Promise<NasaPowerData | null> {
  const baseUrl = 'https://power.larc.nasa.gov/api/temporal/daily/point';
  const parameters = 'T2M,RH2M'; // Temperature at 2m, Relative Humidity at 2m
  
  // Get today's date and yesterday's date in YYYYMMDD format
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const endDate = today.toISOString().slice(0, 10).replace(/-/g, '');
  const startDate = yesterday.toISOString().slice(0, 10).replace(/-/g, '');

  try {
    const response = await axios.get(baseUrl, {
      params: {
        parameters,
        community: 'RE',
        longitude: lon,
        latitude: lat,
        start: startDate,
        end: endDate,
        format: 'JSON',
      },
    });

    const properties = response.data.properties.parameter;
    if (properties && properties.T2M && properties.RH2M) {
      // Get the last available reading
      const t2mKeys = Object.keys(properties.T2M);
      const rh2mKeys = Object.keys(properties.RH2M);

      const lastT2M = properties.T2M[t2mKeys[t2mKeys.length - 1]];
      const lastRH2M = properties.RH2M[rh2mKeys[rh2mKeys.length - 1]];

      if (lastT2M !== -999 && lastRH2M !== -999) {
        return {
          T2M: lastT2M,
          RH2M: lastRH2M,
        };
      }
    }
    return null;

  } catch (error) {
    console.error('Error fetching NASA POWER data:', error);
    return null;
  }
}
