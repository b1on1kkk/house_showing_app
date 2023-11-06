// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
//

// interface
import { ExtendedHouse } from "../../store/interfaces/interface";
//

import { changeMoreInfCheckboxes } from "../../store/features/houses/houses.slice";

export default function CheckboxesToChange({
  house
}: {
  house: ExtendedHouse;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const CheckboxesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeMoreInfCheckboxes({ key_name: e.target.name, id: house.house.id })
    );
  };

  const parsedCheckBoxes = JSON.parse(house.house.house_extensions);

  return (
    <>
      <li>
        <label htmlFor="elevator_existance">Лифт:</label>
        {parsedCheckBoxes.elevator_existance ? (
          <input
            type="checkbox"
            name="elevator_existance"
            checked
            onChange={CheckboxesHandler}
          />
        ) : (
          <input
            type="checkbox"
            name="elevator_existance"
            onChange={CheckboxesHandler}
          />
        )}
      </li>
      <li>
        <label htmlFor="yard">Выход окон во двор:</label>

        {parsedCheckBoxes.yard ? (
          <input
            type="checkbox"
            name="yard"
            checked
            onChange={CheckboxesHandler}
          />
        ) : (
          <input type="checkbox" name="yard" onChange={CheckboxesHandler} />
        )}
      </li>
      <li>
        <label htmlFor="road"> Выход окон на дорогу:</label>

        {parsedCheckBoxes.road ? (
          <input
            type="checkbox"
            name="road"
            checked
            onChange={CheckboxesHandler}
          />
        ) : (
          <input type="checkbox" name="road" onChange={CheckboxesHandler} />
        )}
      </li>
      <li>
        <label htmlFor="park">Выход окон на парк:</label>

        {parsedCheckBoxes.park ? (
          <input
            type="checkbox"
            name="park"
            checked
            onChange={CheckboxesHandler}
          />
        ) : (
          <input type="checkbox" name="park" onChange={CheckboxesHandler} />
        )}
      </li>
      <li>
        <label htmlFor="forest">Выход окон на лес:</label>

        {parsedCheckBoxes.forest ? (
          <input
            type="checkbox"
            name="forest"
            checked
            onChange={CheckboxesHandler}
          />
        ) : (
          <input type="checkbox" name="forest" onChange={CheckboxesHandler} />
        )}
      </li>
      <li>
        <label htmlFor="gas">Газовая плита:</label>

        {parsedCheckBoxes.gas ? (
          <input
            type="checkbox"
            name="gas"
            checked
            onChange={CheckboxesHandler}
          />
        ) : (
          <input type="checkbox" name="gas" onChange={CheckboxesHandler} />
        )}
      </li>
      <li>
        <label htmlFor="electricity">Электрическая плита:</label>

        {parsedCheckBoxes.electricity ? (
          <input
            type="checkbox"
            name="electricity"
            checked
            onChange={CheckboxesHandler}
          />
        ) : (
          <input
            type="checkbox"
            name="electricity"
            onChange={CheckboxesHandler}
          />
        )}
      </li>
    </>
  );
}
