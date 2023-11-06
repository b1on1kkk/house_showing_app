import styles from "../../App.module.css";

import { ExtendedHouse } from "../../store/interfaces/interface";

export default function Images({
  img_link,
  house,
  picture_idx
}: {
  img_link: string;
  house: ExtendedHouse;
  picture_idx: number;
}) {
  return (
    <div className={styles.picture_to_customize}>
      <img src={img_link} alt="photo" />
      {house.extensions.array_of_idx_to_delete.includes(picture_idx) && (
        <div className={styles.chosen_picture}>
          <img src="/plus.png" alt="delete" />
        </div>
      )}
    </div>
  );
}
