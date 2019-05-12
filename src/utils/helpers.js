export const serializeQueryString = (obj) => {
  const str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const getSortQuery = (type) => {
  const sortQueries = {
    LATEST: {
      sortOrder: "desc",
    },
    OLDEST: {
      sortOrder: "asc",
    },
    TiTLE_ASC: {
      sortBy: "title",
      sortOrder: "asc",
    },
    TiTLE_DESC: {
      sortBy: "title",
      sortOrder: "desc",
    },
  };
  return sortQueries[type];
};
