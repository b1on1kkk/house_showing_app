export function FilterPhotos(photos_string: string, idx_array: number[]) {
  const photosArray: string[] = photos_string.split(",");

  const filteredPhotos: string[] = photosArray.filter((img_link, idx) => {
    if (!idx_array.includes(idx) && img_link !== "") return img_link;
  });

  return filteredPhotos.toString();
}
