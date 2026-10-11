import Image from 'next/image';
import { CurrentWeatherResponse } from '../actions/CurrentWeather';
import { GeoIcon } from './icons/GeoIcon';
import { ThermometherIcon } from './icons/ThermometerIcon';
import { DropIcon } from './icons/DropIcon';
import { WindIcon } from './icons/WindIcon';
import { SpeedometerIcon } from './icons/SpeedometerIcon';
import { ArrowClockWiseIcon } from './icons/ArrowClockWiseIcon';
import { daysOfWeek, months } from '../../util/date';

function Card({ children, style }) {
  return <div style={style} className='shadow-xs flex flex-1 items-center gap-x-2 p-2 rounded-xl'>
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

  let result = '';

  {
    const updatedAt = data.current.last_updated_epoch * 1000;
    const diff = Date.now() - updatedAt;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
      result = "Agora mesmo";
    } else if (minutes < 60) {
      result = `há ${minutes} min`;
    } else if (hours < 24) {
      result = `há ${hours} h`;
    } else {
      result = `há ${days} dias`;
    }
  }

  const cardsMetada = [
    {
      title: 'Sensação térmica',
      subtitle: `${data.current.feelslike_c}°C`,
      Icon: ThermometherIcon,
      backgroundColor: '#116ccd',
      iconColor: '#48a6fd'
    },
    {
      title: 'Umidade do ar',
      subtitle: `${data.current.humidity}%`,
      Icon: DropIcon,
      backgroundColor: '#0b8274',
      iconColor: '#23cca0'
    },
    {
      title: 'Velocidade do vento',
      subtitle: `${data.current.wind_kph} km/h ${data.current.wind_dir}`,
      Icon: WindIcon,
      backgroundColor: '#5b33bb',
      iconColor: '#9c65f4'
    },
    {
      title: 'Pressão atmosférica',
      subtitle: `${data.current.pressure_mb} hPa`,
      Icon: SpeedometerIcon,
      backgroundColor: '#f0772d',
      iconColor: '#fec738'
    }
  ];

  return (
    <div className='bg-[#0b2b5b] w-full text-white flex flex-col gap-y-4 mx-auto ring p-4 rounded-xl shadow-xl'>

      <div className='text-sm md:text-2xl flex gap-x-2 justify-between'>
        <div className='flex'>
          <div><GeoIcon /></div>
          <div className='ml-2 flex flex-col'>
            <strong>{data.location.name}, {data.location.region}</strong>
            <p>{dayOfWeek}, {day} de {month} de {year} • {hours}</p>
          </div>
        </div>

        <div className='bg-[#47a0dd] shadow-md text-xs md:text-base flex gap-x-1 items-center p-2 self-start rounded-4xl'>
          <div className='text-2xl'><ArrowClockWiseIcon /></div>
          <div> Atualizado {result}</div>
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

      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>
        {
          cardsMetada.map(e => (
            <Card key={e.title} style={{ backgroundColor: e.backgroundColor }}>
              <div className='text-2xl p-4 rounded-full aspect-square flex items-center justify-center' style={{ backgroundColor: e.iconColor }}>
                <e.Icon />
              </div>

              <div className='flex flex-col justify-between'>
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
