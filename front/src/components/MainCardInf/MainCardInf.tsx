import styles from "../../App.module.css";

import { ExtendedHouse } from "../../store/interfaces/interface";

export default function MainCardInf({ house }: { house: ExtendedHouse }) {
  return (
    <>
      <div className={styles.title_text_wrapper}>
        <span>{house.house.title}</span>
      </div>
      <div className={styles.price_wrapper}>
        Цена: {house.house.price.replace("$", "").split(" ").join("")} $ / BYN :{" "}
        {house.extensions.price_in_BYN}
      </div>
      <div className={styles.number_of_rooms_wrapper}>
        Количество комнат: {house.house.number_of_rooms}
      </div>
      <div className={styles.total_area_wrapper}>
        Общая площадь: {house.house.total_area} М<sup>3</sup>
      </div>
      <div className={styles.living_area_wrapper}>
        Жилая площадь: {house.house.living_area} М<sup>3</sup>
      </div>
      <div className={styles.location_wrapper}>{house.house.location}</div>
      <div className={styles.type_of_wrapper}>Тип: {house.house.type}</div>
      <div className={styles.floor}>Этаж: {house.house.floor}</div>
      <div className={styles.floors}>Этажей в доме: {house.house.floors}</div>
    </>
  );
}
