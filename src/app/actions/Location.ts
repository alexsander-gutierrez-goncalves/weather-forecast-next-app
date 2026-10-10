'use server'

export type Location = {
  id: number,
  name: string,
  region: string,
  country: string,
  lat: number,
  lon: number,
  url: string
}

export async function searchLocation(q: string): Promise<Location[]> {
  if (!q) return [];
  try {
    const url = `http://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${q}&aqi=no&lang=pt`
    const request = await fetch(url, { next: { revalidate: 1 } })
    return await request.json();
  } catch (error) {
    return [];
  }
}