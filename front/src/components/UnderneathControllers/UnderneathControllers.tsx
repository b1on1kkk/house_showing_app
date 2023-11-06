import styles from "../../App.module.css";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { toggleToShowMoreAboutHouse } from "../../store/features/houses/houses.slice";
import { toggleToChangeDataHouse } from "../../store/features/houses/houses.slice";
import { getHouses } from "../../store/features/houses/houses.slice";
import { deleteHouseHanlder } from "../../store/features/houses/houses.slice";
//

// interface
import { ExtendedHouse } from "../../store/interfaces/interface";
//

// utils
import { scrollToTop } from "../../utils/ScrollToTop";
//

export default function UnderneathControllers({
  house,
  show_more_checker
}: {
  house: ExtendedHouse;
  show_more_checker: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.block_handling_block}>
      <div
        className={styles.more_inf}
        onClick={() => dispatch(toggleToShowMoreAboutHouse(house.house.id))}
      >
        <span>Больше информации</span>
        <div
          className={
            show_more_checker ? styles.arrow_wrapper_up : styles.arrow_wrapper
          }
        >
          <img src="/arrow_down.png" alt="" />
        </div>
      </div>
      <div
        className={styles.trash_block_wrapper}
        onClick={() => {
          dispatch(deleteHouseHanlder(JSON.stringify(house.house.id)));

          setTimeout(() => {
            dispatch(getHouses(""));
          }, 300);
        }}
      >
        <img src="/trash.png" alt="13" />
      </div>

      <div
        className={styles.trash_block_wrapper}
        onClick={() => {
          if (house.extensions.changer) {
            dispatch(getHouses(""));
            scrollToTop();
          } else {
            dispatch(toggleToChangeDataHouse(house.house.id));
          }
        }}
      >
        <img src="/change.png" alt="13" />
      </div>
    </div>
  );
}
