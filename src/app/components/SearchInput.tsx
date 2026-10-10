"use client";

import { RefObject, useRef, useState } from "react";
import { Location, searchLocation } from "../actions/Location";
import { MagnifyGlassIcon } from "./icons/MagnifyGlassIcon";
import { XIcon } from "./icons/XIcon";

export function SearchInput({ ref }: { ref: RefObject<HTMLInputElement> }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const timeout = useRef<ReturnType<typeof setTimeout | null>>(null);

  const onClickLocation = (location: string) => {
    ref.current.value = location;
    setLocations([]);
  }

  const onChangeText = (value: string) => {
    if (value.length >= 3 && timeout.current == null) {
      timeout.current = setTimeout(async () => {
        const data = await searchLocation(value);
        setLocations(data);
        timeout.current = null;
      }, 500)
    } else if (value.length == 0) {
      setLocations([]);
    }
  }

  const clearInput = () => {
    ref.current.value = "";
    setLocations([]);
  }

  return <div className="z-1 w-full sm:w-1/2 relative">
    <div className="bg-white flex items-center rounded-4xl shadow-md outline-offset-0 hover:outline-cyan-500 focus:outline-cyan-400">
      <div className="p-4 flex items-center flex-1 justify-center">
        <MagnifyGlassIcon />
      </div>
      <input
        ref={ref}
        className="w-full outline-none py-4"
        placeholder="Buscar"
        type="text"
        name="q"
        autoComplete="off"
        onChange={e => onChangeText(e.currentTarget.value)}
      />
      <div className="p-4 flex items-center flex-1 justify-center">
        <button onClick={clearInput} className="cursor-pointer" type="button">
          <XIcon />
        </button>
      </div>
    </div>
    {
      locations.length != 0 && <div className="-z-1 absolute w-full bg-gray-100 pt-18 pb-8 top-0 rounded-4xl">
        <ul>
          {
            locations.map(location =>
              <li key={location.id}  >
                <button type="button" className="text-left w-full px-12 cursor-pointer py-2 hover:bg-gray-300 " onClick={() => onClickLocation(location.name + ", " + location.region)} >{location.name}, {location.region}</button>
              </li>
            )
          }
        </ul>
      </div>
    }
  </div>
}