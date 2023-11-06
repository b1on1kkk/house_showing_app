import { ExtendedHouse } from "../../store/interfaces/interface";

import Form from "../Form/Form";

export default function EditForm({ house }: { house: ExtendedHouse }) {
  return <Form house={house} status="change_exist_post"></Form>;
}
