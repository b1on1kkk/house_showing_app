import styles from "../../App.module.css";

// components
import Images from "../Images/Images";
import EditForm from "../EditForm/EditForm";
import MainCardInf from "../MainCardInf/MainCardInf";
import UnderneathControllers from "../UnderneathControllers/UnderneathControllers";
import MainCheckBoxes from "../MainCheckBoxes/MainCheckBoxes";
import CheckboxesToChange from "../CheckboxesToChange/CheckboxesToChange";
//

// interface
import { ExtendedHouse } from "../../store/interfaces/interface";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { pictureToDelete } from "../../store/features/houses/houses.slice";
//

export default function HouseCard({ house }: { house: ExtendedHouse }) {
  const dispatch = useDispatch<AppDispatch>();

  const DeletePictureHandler = (idx: number) => {
    dispatch(
      pictureToDelete({
        picture_id: idx,
        id: house.house.id
      })
    );
  };

  return (
    <div
      className={
        house.extensions.changer
          ? `${styles.house_card_wrapper} col-12`
          : `${styles.house_card_wrapper} col-xl-3 col-lg-4 col-md-6`
      }
    >
      <div className={styles.inner_wrapper}>
        <div className={styles.text}>
          {house.extensions.changer ? (
            <>
              <div className={styles.picture_wrapper}>
                <div className="row">
                  {house.house.photos !== "" ? (
                    <>
                      {house.house.photos.split(",").map((img_link, idx) => {
                        return (
                          <>
                            {idx === 0 ? (
                              <div
                                className="col-12"
                                onClick={() => DeletePictureHandler(idx)}
                              >
                                <Images
                                  img_link={img_link}
                                  house={house}
                                  picture_idx={idx}
                                />
                              </div>
                            ) : (
                              <div
                                className={`${styles.mini_photos} col-6`}
                                onClick={() => DeletePictureHandler(idx)}
                              >
                                <Images
                                  img_link={img_link}
                                  house={house}
                                  picture_idx={idx}
                                />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <h3>Фотографии отсутствуют</h3>
                  )}
                </div>
              </div>

              <EditForm house={house} />
            </>
          ) : (
            <>
              <div className={styles.picture_wrapper}>
                <div className="row">
                  {house.house.photos !== "" ? (
                    <>
                      {house.house.photos.split(",").map((img_link, idx) => {
                        return (
                          <>
                            {idx === 0 ? (
                              <div className="col-12" key={idx}>
                                <img src={img_link} alt="photo" />
                              </div>
                            ) : (
                              <div
                                className={`${styles.mini_photos} col-6`}
                                key={idx}
                              >
                                <img src={img_link} alt="photo" />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <h3>Фотографии отсутствуют</h3>
                  )}
                </div>
              </div>
              <MainCardInf house={house} />
            </>
          )}
        </div>

        <UnderneathControllers
          house={house}
          show_more_checker={house.extensions.show_more}
        />

        <div
          className={
            house.extensions.show_more
              ? styles.more_inf_block_show
              : styles.more_inf_block_hide
          }
        >
          <ul className={styles.more_inf_block}>
            {house.extensions.changer ? (
              <CheckboxesToChange house={house} />
            ) : (
              <MainCheckBoxes house={house} />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
