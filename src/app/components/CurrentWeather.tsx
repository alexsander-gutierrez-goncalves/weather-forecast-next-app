import Image from 'next/image';
import { CurrentWeatherResponse } from '../actions/CurrentWeather';
import { GeoIcon } from './icons/GeoIcon';
import { ThermometherIcon } from './icons/ThermometerIcon';
import { DropIcon } from './icons/DropIcon';
import { WindIcon } from './icons/WindIcon';
import { SpeedometerIcon } from './icons/SpeedometerIcon';

const daysOfWeek = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

function Card({ children }) {
  return <div className='flex flex-1 ring gap-x-2 items-center p-4 rounded-lg'>
    {children}
  </div>
}

export function CurrentWeather({ data }: { data: CurrentWeatherResponse }) {
  const date = new Date(data.location.localtime);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = data.location.localtime.split(" ")[1];

  const cardsMetada = [
    {
      title: "Sensação térmica",
      subtitle: `${data.current.feelslike_c}°C`,
      Icon: ThermometherIcon
    },
    {
      title: "Umidade do ar",
      subtitle: `${data.current.humidity}%`,
      Icon: DropIcon
    },
    {
      title: "Velocidade do vento",
      subtitle: `${data.current.wind_kph} km/h ${data.current.wind_dir}`,
      Icon: WindIcon
    },
    {
      title: "Pressão atmosférica",
      subtitle: `${data.current.pressure_mb} hPa`,
      Icon: SpeedometerIcon
    }
  ];

  return (
    <div className="w-full text-white flex flex-col gap-y-4 mx-auto ring p-4 rounded-xl">

      <div className='text-2xl flex gap-x-2'>
        <GeoIcon />
        <div className='flex flex-col'>
          <strong>{data.location.name}, {data.location.region}</strong>
          <p>{dayOfWeek}, {day} de {month} de {year} • {hours}</p>
        </div>
      </div>

      <div className='flex items-center gap-x-2'>
        <Image
          src={`https:${data.current.condition.icon}`}
          width={96}
          height={96}
          alt='icon'
        />

        <div className='flex flex-col'>
          <strong className='text-6xl'>{data.current.temp_c}°</strong>
          <strong className='text-2xl'>{data.current.condition.text}</strong>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-2'>
        {
          cardsMetada.map(e => (
            <Card key={e.title}>
              <div className='text-4xl p-4 rounded-full ring bg-white/25'>
                <e.Icon />
              </div>

              <div className='flex flex-col'>
                <strong>
                  {e.title}
                </strong>
                <strong>
                  {e.subtitle}
                </strong>
              </div>
            </Card>
          ))
        }

      </div>

    </div>
  );
}
