import Form from "../Form/Form";

import { ExtendedHouse } from "../../store/interfaces/interface";

export default function NewPost({
  new_added_house,
  add_more_modal_setter
}: {
  new_added_house: ExtendedHouse;
  add_more_modal_setter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Form
      house={new_added_house}
      status="new_post"
      add_more_modal_setter={add_more_modal_setter}
    ></Form>
  );
}
