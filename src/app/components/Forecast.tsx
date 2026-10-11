import { ForecastReponse } from "../actions/Forecast";
import { ClockIcon } from "./icons/ClockIcon";
import { CalendarIcon } from "./icons/CalendarIcon";
import Image from "next/image";
import { UmbrellaIcon } from "./icons/UmbrellaIcon";
import { daysOfWeekShort } from "../../util/date";
import { HTMLAttributes } from "react";

function Card({ children, style }: HTMLAttributes<HTMLDivElement>) {
  return <div style={style} className="shrink-0 justify-between text-white rounded-lg flex flex-col items-center p-4 ring-white ring shadow-lg">
    {children}
  </div>
}

const colors = ['#116ccd', '#5b33bb', '#f0772d']

export function Forecast({ forecast }: { forecast: ForecastReponse }) {

  const getDayOfWeek = (value: string) => {
    const date = new Date(value);
    const dayOfWeek = daysOfWeekShort[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return { dayOfWeek, day, month };
  }

  const currentHour = new Date().getTime()
  const hours = forecast.forecast.forecastday[0].hour.filter(e => e.time_epoch * 1000 >= currentHour)

  return <div className="flex flex-col gap-4">
    <div className="p-4 ring ring-white rounded-2xl bg-[#0b2b5b]">
      <div className="text-white flex items-center gap-2">
        <ClockIcon />
        <p>Previsão por hora</p>
      </div>
      <div className="flex overflow-x-auto gap-4 p-4">
        {
          hours.map((e, i) => (
            <Card key={e.time} style={{ backgroundColor: i == 0 ? '#116ccd' : '' }} >
              <strong>{i == 0 ? "Agora" : e.time.split(" ")[1]}</strong>
              <Image
                src={`https:${e.condition.icon}`}
                width={64}
                height={64}
                alt="icon"
              />
              <strong>{e.temp_c}°</strong>
            </Card>
          ))
        }
      </div>
    </div>

    <div className="p-4 ring ring-white rounded-2xl bg-[#0b2b5b]">
      <div className="text-white flex items-center gap-2">
        <CalendarIcon />
        <p>Previsão para {forecast.forecast.forecastday.length} dias</p>
      </div>
      <div className="flex overflow-x-auto gap-4 p-4">
        {
          forecast.forecast.forecastday.map((e, i) => {
            const { dayOfWeek, day, month } = getDayOfWeek(e.date);

            return <Card key={e.date_epoch} style={{ backgroundColor: colors[i] }} >
              <div className="flex items-center">
                <Image
                  src={`https:${e.day.condition.icon}`}
                  width={64}
                  height={64}
                  alt="icon"
                />

                <div className="flex flex-col justify-between">
                  <strong>{dayOfWeek}</strong>
                  {/* <strong>{`${day}/${month}`}</strong> */}

                  <strong>{e.day.maxtemp_c}° / {e.day.mintemp_c}°</strong>
                </div>
                {/* <div className="flex items-center gap-2 text-gray-300">
                <UmbrellaIcon />{e.day.daily_chance_of_rain}%
              </div> */}
              </div>
            </Card>
          })
        }
      </div>
    </div>
  </div>
}