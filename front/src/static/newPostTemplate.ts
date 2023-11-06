export const template = {
  house: {
    id: 0,
    title: "",
    price: "",
    number_of_rooms: 0,
    total_area: 0,
    living_area: 0,
    location: "",
    type: "",
    floor: 0,
    floors: 0,
    house_extensions: JSON.stringify({
      yard: true,
      road: true,
      park: false,
      forest: false,
      elevator_existance: true,
      gas: false,
      electricity: true
    }),
    photos: ""
  },
  extensions: {
    show_more: false,
    changer: false,
    array_of_idx_to_delete: [],
    price_in_BYN: 0
  }
};
