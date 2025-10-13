import constants from "./constants";

const queryBuilder = (params) => {
  let searchQuery = constants.API_URL;
  const { team, size, isLongSleeve } = params;
  console.log("ERES UN POBRE Y TRISTE PENDEJO");
  if (team) {
    searchQuery += `search_text=${team}`;
  } else {
    console.log("No searh term");
    return;
  }

  if (size) {
    switch (size) {
      case "M":
        searchQuery += `&size_ids[]=208`;
        break;
      case "L":
        searchQuery += `&size_ids[]=209`;
        break;
      default:
        break;
    }
  }

  return searchQuery;
};

export default queryBuilder;
