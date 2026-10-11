"use client";

import { RefObject, useRef, useState } from "react";
import { Location, searchLocation } from "../actions/Location";
import { MagnifyGlassIcon } from "./icons/MagnifyGlassIcon";
import { XIcon } from "./icons/XIcon";

export function SearchInput({ ref }: { ref: RefObject<HTMLInputElement> }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const timeout = useRef<ReturnType<typeof setTimeout | null>>(null);
  const clearButton = useRef<HTMLButtonElement>(null);

  const onClickLocation = (location: string) => {
    ref.current.value = location;
    setLocations([]);
  }

  const onChangeText = (value: string) => {
    clearButton.current.hidden = value.length == 0;
    if (value.length < 3) {
      clearTimeout(timeout.current);
      timeout.current = null;
      setLocations([]);
    } else if (value.length >= 3 && timeout.current == null) {
      timeout.current = setTimeout(async () => {
        const data = await searchLocation(value);
        setLocations(data);
        timeout.current = null;
      }, 500)
    }
  }

  const clearInput = () => {
    ref.current.value = "";
    setLocations([]);
  }

  return <div className="bg-[#1a3561] shadow-md text-white z-1 w-full sm:w-1/2 relative rounded-4xl px-2">
    <div className="flex items-center outline-offset-0 hover:outline-cyan-500 focus:outline-cyan-400">
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
      <button ref={clearButton} hidden={true} onClick={clearInput} className="cursor-pointer p-4 flex items-center flex-1 justify-center" type="button">
        <XIcon />
      </button>
    </div>
    {
      locations.length != 0 &&
      <div
        className="left-0 absolute w-full bg-[#1a3561] rounded-4xl pt-14 top-0 -z-1"
      >
        {
          locations.map(location =>
            <button key={location.id} type="button" className="text-black text-left w-full px-14 cursor-pointer py-2 hover:bg-gray-300 " onClick={() => onClickLocation(location.name + ", " + location.region)} >{location.name}, {location.region}</button>
          )
        }
      </div>
    }
  </div>
}