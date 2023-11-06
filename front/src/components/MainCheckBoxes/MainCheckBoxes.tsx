import { ExtendedHouse } from "../../store/interfaces/interface";

import ShowChecked from "../ShowChecked/ShowChecked";

export default function MainCheckBoxes(house: { house: ExtendedHouse }) {
  const parsedData = JSON.parse(house.house.house.house_extensions);
  return (
    <>
      <li>
        <ShowChecked checker={parsedData.elevator_existance} text="Лифт:" />
      </li>
      <li>
        <ShowChecked checker={parsedData.yard} text="Выход окон во двор:" />
      </li>
      <li>
        <ShowChecked checker={parsedData.road} text="Выход окон на дорогу:" />
      </li>
      <li>
        <ShowChecked checker={parsedData.park} text=" Выход окон на парк:" />
      </li>
      <li>
        <ShowChecked checker={parsedData.forest} text="Выход окон на лес:" />
      </li>
      <li>
        <ShowChecked checker={parsedData.gas} text="Газовая плита:" />
      </li>
      <li>
        <ShowChecked
          checker={parsedData.electricity}
          text="Электрическая плита:"
        />
      </li>
    </>
  );
}
