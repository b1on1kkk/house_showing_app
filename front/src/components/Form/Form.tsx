import styles from "../../App.module.css";

// interface
import { ExtendedHouse } from "../../store/interfaces/interface";
//

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { textHandlerChanger } from "../../store/features/houses/houses.slice";
import { useState } from "react";
import { changeDataInDatabase } from "../../store/features/houses/houses.slice";
import { addNewFilesToServer } from "../../store/features/houses/houses.slice";
import { setUpNewPictures } from "../../store/features/houses/houses.slice";
import { addNewHouseToDatabase } from "../../store/features/houses/houses.slice";
import { getHouses } from "../../store/features/houses/houses.slice";
import { NewHouseHandler } from "../../store/features/houses/houses.slice";
//

// utils
import { scrollToTop } from "../../utils/ScrollToTop";
//

export default function Form({
  house,
  status,
  add_more_modal_setter
}: {
  house: ExtendedHouse;
  status: "new_post" | "change_exist_post";
  add_more_modal_setter?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [filesToSend, setFilesToSend] = useState<FormData | null>(null);

  const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // call function only if filesToSend is not empty
    if (filesToSend) dispatch(addNewFilesToServer(filesToSend));

    if (status === "change_exist_post") {
      dispatch(changeDataInDatabase(house.house));
    } else {
      dispatch(addNewHouseToDatabase(house.house));
      add_more_modal_setter!(false);
    }

    setTimeout(() => {
      dispatch(getHouses(""));
      scrollToTop();
    }, 700);
  };

  const onChangeDataTextHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      textHandlerChanger({
        new_data: e.target.value,
        key_name: e.target.name,
        id: house.house.id
      })
    );
  };

  const onChangeFilesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // possibility to push more than 1 file is exist
    const newFilesArray: File[] = [];

    for (let i = 0; i < e.target.files!.length; i++) {
      newFilesArray.push(
        new File(
          [e.target.files![i]],
          `${Date.now()}${e.target.files?.[i].name}`,
          { type: e.target.files![i].type }
        )
      );
    }

    // adding to array new links and converting array into string back
    const array = house.house.photos.split(",").filter((str) => str !== "");
    for (let i = 0; i < newFilesArray.length; i++) {
      array.push(
        `http://localhost:2005/photos?picture=${newFilesArray[i].name}`
      );
    }

    dispatch(
      setUpNewPictures({
        new_links: array.toString(),
        id: house.house.id
      })
    );

    const buffFormData = new FormData();
    newFilesArray.forEach((e) => {
      buffFormData.append("housePhotos", e);
    });

    setFilesToSend(buffFormData);
  };

  return (
    <form
      onSubmit={SubmitHandler}
      encType="multipart/form-data"
      className={styles.form}
    >
      <div className={styles.title_text_wrapper}>
        <textarea
          name="title"
          value={house.house.title}
          onChange={onChangeDataTextHandler}
        ></textarea>
      </div>

      <div className={styles.pictures_uploader}>
        <label htmlFor="file_input">Загрузка фотографий:</label>
        <input
          type="file"
          name="photos"
          multiple
          onChange={onChangeFilesHandler}
          id="file_input"
        />
      </div>

      <div className={styles.price_wrapper}>
        <label htmlFor="price">Цена:</label>
        <input
          type="number"
          placeholder="Введите цену в долларах"
          value={house.house.price}
          name="price"
          id="price"
          onChange={onChangeDataTextHandler}
        />
      </div>

      <div className={styles.number_of_rooms_wrapper}>
        <label htmlFor="number_of_rooms">Кол-во комнат:</label>
        <input
          type="number"
          placeholder="Количество комнат"
          value={house.house.number_of_rooms}
          name="number_of_rooms"
          id="number_of_rooms"
          onChange={onChangeDataTextHandler}
        />
      </div>
      <div className={styles.total_area_wrapper}>
        <label htmlFor="total_area">Общая площадь:</label>
        <input
          type="number"
          placeholder="Общая площадь"
          value={house.house.total_area}
          name="total_area"
          onChange={onChangeDataTextHandler}
        />
      </div>
      <div className={styles.living_area_wrapper}>
        <label htmlFor="living_area">Жилая площадь:</label>
        <input
          type="number"
          placeholder="Жилая площадь"
          value={house.house.living_area}
          name="living_area"
          id="living_area"
          onChange={onChangeDataTextHandler}
        />
      </div>
      <div className={styles.living_area_wrapper}>
        <label htmlFor="location">Локация:</label>
        <input
          type="text"
          placeholder="Адрес"
          name="location"
          id="location"
          value={house.house.location}
          onChange={onChangeDataTextHandler}
        />
      </div>
      <div className={styles.type_of_wrapper}>
        <label htmlFor="house_types">Тип:</label>
        <select
          name="type"
          id="house_types"
          onChange={onChangeDataTextHandler}
          defaultValue={"Select type..."}
        >
          <option value="Квартира">Квартира</option>
          <option value="Участок">Участок</option>
          <option value="Дом">Дом</option>
        </select>
      </div>
      <div className={styles.floor}>
        <label htmlFor="floor">Этаж:</label>
        <input
          type="number"
          placeholder="Этаж"
          name="floor"
          id="floor"
          onChange={onChangeDataTextHandler}
          value={house.house.floor}
        />
      </div>
      <div className={styles.floors}>
        <label htmlFor="floors">Этажей в доме:</label>
        <input
          type="number"
          placeholder="Этажей в доме"
          name="floors"
          id="floors"
          value={house.house.floors}
          onChange={onChangeDataTextHandler}
        />
      </div>
      <div className={styles.submit_button}>
        <button type="submit">Submit!</button>
      </div>

      {status === "new_post" && (
        <div className={styles.submit_button}>
          <button
            onClick={() => {
              add_more_modal_setter!(false);
              dispatch(NewHouseHandler({ data: null, status: "pop" }));
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
