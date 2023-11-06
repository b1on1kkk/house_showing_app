import { getRandomInt } from "./RandInt";

export function Converter(value: string): number {
  return (
    parseInt(value.replace("$", "").split(" ").join("")) * getRandomInt(3, 5)
  );
}
