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
  
  // Get date range for the last 3-4 days to ensure data availability.
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() - 2); // End date is 2 days ago
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 3); // Start date is 3 days ago

  const endDateString = endDate.toISOString().slice(0, 10).replace(/-/g, '');
  const startDateString = startDate.toISOString().slice(0, 10).replace(/-/g, '');

  // Manually construct the URL to ensure correct parameter formatting
  const requestUrl = `${baseUrl}?parameters=${parameters}&community=RE&longitude=${lon}&latitude=${lat}&start=${startDateString}&end=${endDateString}&format=JSON`;

  try {
    const response = await axios.get(requestUrl);

    const properties = response.data?.properties?.parameter;
    if (properties && properties.T2M && properties.RH2M) {
      // Get the last available reading
      const t2mKeys = Object.keys(properties.T2M);
      const rh2mKeys = Object.keys(properties.RH2M);
      
      if (t2mKeys.length === 0 || rh2mKeys.length === 0) {
        console.warn('NASA POWER API returned no data for the requested date range.');
        return null;
      }

      const lastT2M = properties.T2M[t2mKeys[t2mKeys.length - 1]];
      const lastRH2M = properties.RH2M[rh2mKeys[rh2mKeys.length - 1]];

      // The API returns -999 for missing values.
      if (lastT2M !== -999 && lastRH2M !== -999) {
        return {
          T2M: lastT2M,
          RH2M: lastRH2M,
        };
      }
    }
    console.warn('NASA POWER API response was missing expected data properties.');
    return null;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error fetching NASA POWER data: Status ${error.response.status}`, error.response.data);
    } else {
      console.error('Error fetching NASA POWER data:', error);
    }
    return null;
  }
}
