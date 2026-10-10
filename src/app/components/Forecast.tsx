import { ForecastReponse } from "../actions/Forecast";
import { ClockIcon } from "./icons/ClockIcon";
import { CalendarIcon } from "./icons/CalendarIcon";
import Image from "next/image";
import { UmbrellaIcon } from "./icons/UmbrellaIcon";

function Card({ children }) {
  return <div className="text-white rounded-lg flex flex-col items-center p-4 ring-white ring">
    {children}
  </div>
}

export function Forecast({ forecast }: { forecast: ForecastReponse }) {
  return <div className="flex flex-col gap-4">
    <div className="p-4 ring ring-white rounded-2xl">
      <div className="text-white flex items-center gap-2">
        <ClockIcon />
        <p>Previsão por hora</p>
      </div>
      <div className="flex scrollbar overflow-x-auto gap-4 p-4">
        {
          forecast.forecast.forecastday[0].hour.map((e, i) => (
            <Card key={e.time}>
              <strong>{i == 0 ? "Agora" : e.time.split(" ")[1]}</strong>
              <Image
                src={`https:${e.condition.icon}`}
                width={64}
                height={64}
                alt="icon"
              />
              <p>{e.temp_c}°</p>
            </Card>
          ))
        }
      </div>
    </div>
    <div className="p-4 ring ring-white rounded-2xl">
      <div className="text-white flex items-center gap-2">
        <CalendarIcon />
        <p>Previsão para {forecast.forecast.forecastday.length} dias</p>
      </div>
      <div className="flex overflow-x-auto gap-4 p-4">
        {
          forecast.forecast.forecastday.map(e => (
            <Card key={e.date_epoch}>
              <strong>{e.date}</strong>
              <Image
                src={`https:${e.day.condition.icon}`}
                width={64}
                height={64}
                alt="icon"
              />
              <p>{e.day.maxtemp_c}° <span className="text-gray-400">{e.day.mintemp_c}°</span></p>
              <div className="flex items-center gap-2 text-gray-300">
                <UmbrellaIcon />{e.day.daily_chance_of_rain}%
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  </div>
}