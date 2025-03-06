import { selectGameInterface } from "@/interface";
import { ChangeEvent } from "react";

export function GameSelect({ type, setType, level, setLevel, gameSelect }: selectGameInterface) {
  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setType(selectedType);

    const selectedGameType = gameSelect.find(e => e.type === selectedType);

    if (selectedGameType) {
      setLevel(selectedGameType.level[0]);
    }
  };

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevel(event.target.value);
  };

  const selectedGameType = gameSelect.find(e => e.type === type);

  return (
    <div className="text-xl border-cyan-600 border-4 rounded-lg relative">
      <span className="absolute font-bold bg-slate-800 -top-4 px-2 rounded-full left-1/2 transform -translate-x-1/2">
        Select
      </span>
      <form className="mx-auto md:flex block px-3 py-5 gap-4 items-center">
        <label className="block mb-2 text-xl font-medium">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={handleTypeChange}
          className="block truncate w-full text-lg p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {gameSelect.map((e, index) => (
            <option key={index} value={e.type}>{e.type}</option>
          ))}
        </select>
        <label className="block mb-2 mt-3 md:mt-0 text-xl font-medium">
          Level
        </label>
        <select
          id="level"
          value={level}
          onChange={handleLevelChange}
          className="block truncate w-full text-lg p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {selectedGameType && selectedGameType.level.map((lvl, index) => (
            <option key={index} value={lvl}>{lvl}</option>
          ))}
        </select>
      </form>
    </div>
  )
}
