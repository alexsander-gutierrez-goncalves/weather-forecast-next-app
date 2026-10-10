"use client"

import { useRef, useState } from 'react';
import { CurrentWeatherResponse, getCurrentWeather } from './actions/CurrentWeather';
import { ForecastReponse, getForecast } from './actions/Forecast';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { GeoIcon } from './components/icons/GeoIcon';
import { MagnifyGlassIcon } from './components/icons/MagnifyGlassIcon';
import { SearchInput } from './components/SearchInput';

export default function Home() {
  const [data, setData] = useState<{
    current: CurrentWeatherResponse,
    forecast: ForecastReponse
  }>({ current: null, forecast: null });

  const inputRef = useRef<HTMLInputElement>(null);

  const getData = async (text: string) => {
    const current = await getCurrentWeather(text);
    const forecast = await getForecast(text);
    return { current, forecast };
  }

  const onClickSearch = async () => {
    const { current, forecast } = await getData(inputRef.current.value);
    setData({ current, forecast })
  }

  const onClickGetCurrentPosition = async () => {
    navigator.geolocation.getCurrentPosition(async success => {
      const { latitude, longitude } = success.coords;
      const { current, forecast } = await getData(`${latitude},${longitude}`);
      setData({ current, forecast })
    }, error => {
      alert(error.message)
    })
  }

  return (
    <div className="items-center justify-between flex flex-col p-4">
      <main className="flex flex-col gap-y-4 w-full">
        <div className="inline-flex items-center justify-center gap-x-4">
          <SearchInput ref={inputRef} />

          <button
            style={{ backgroundColor: '#1279fb' }}
            className="p-5 text-white ring cursor-pointer rounded-full shadow-md hover:scale-105 focus:outline-white focus:outline"
            type="button"
            aria-label="buscar"
            title="buscar"
            onClick={onClickSearch}
          >
            <MagnifyGlassIcon />
          </button>

          <button onClick={onClickGetCurrentPosition} className='rounded-full ring p-3 text-sm cursor-pointer text-white hover:scale-105' type='button'>
            <GeoIcon />
          </button>
        </div>
        {data.current != null && <CurrentWeather data={data.current} />}
        {data.forecast != null && <Forecast forecast={data.forecast} />}
        {data == null && <p className="text-center text-red-500 font-bold text-xl">
          Nenhum resultado encontrado
        </p>}
      </main>
    </div>
  );
}
