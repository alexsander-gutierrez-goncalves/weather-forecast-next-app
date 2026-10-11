"use client"

import { useState } from 'react';
import { CurrentWeatherResponse } from './actions/CurrentWeather';
import { ForecastReponse } from './actions/Forecast';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { Header } from './components/Header';

export default function Home() {
  const [data, setData] = useState<{
    current: CurrentWeatherResponse,
    forecast: ForecastReponse
  }>({ current: null, forecast: null });

  return (
    <div className="items-center justify-between flex flex-col p-4">
      <main className="flex flex-col gap-y-4 w-full">
        <Header setData={setData} />
        {data.current != null && <CurrentWeather data={data.current} />}
        {data.forecast != null && <Forecast forecast={data.forecast} />}
        {data == null && <p className="text-center text-red-500 font-bold text-xl">
          Nenhum resultado encontrado
        </p>}
      </main>
    </div>
  );
}
