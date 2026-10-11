"use client"
import { Dispatch, SetStateAction, useRef } from "react";
import { GeoIcon } from "./icons/GeoIcon";
import { MagnifyGlassIcon } from "./icons/MagnifyGlassIcon";
import { SearchInput } from "./SearchInput";
import { CurrentWeatherResponse, getCurrentWeather } from "../actions/CurrentWeather";
import { ForecastReponse, getForecast } from "../actions/Forecast";
import { CloudSunIcon } from "./icons/CloudSunIcon";

type Props = {
  setData: Dispatch<SetStateAction<{
    current: CurrentWeatherResponse;
    forecast: ForecastReponse;
  }>>
}

export function Header({ setData }: Props) {
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

  return <div className="flex-wrap inline-flex items-center justify-center md:justify-between gap-4">
    <div className="text-white text-5xl flex p-2 items-center justify-center gap-2">
      <CloudSunIcon />
      <strong className="text-2xl self-end">Clima</strong>
    </div>

    <SearchInput ref={inputRef} />

    <div className="flex gap-4 items-center">
      <button
        className="bg-[#1371fa] text-2xl p-4 text-white cursor-pointer rounded-full shadow-md hover:scale-105"
        type="button"
        aria-label="buscar"
        title="buscar"
        onClick={onClickSearch}
      >
        <MagnifyGlassIcon />
      </button>

      <button
        className='bg-[#163c83] text-2xl p-4 rounded-full cursor-pointer text-white hover:scale-105'
        onClick={onClickGetCurrentPosition}
        type='button'
      >
        <GeoIcon />
      </button>
    </div>
  </div>
}