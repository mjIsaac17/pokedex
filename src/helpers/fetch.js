const baseUrl = "https://pokeapi.co/api/v2";

export const fetchNoToken = (endpoint = "", method = "GET", data = {}) => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === "GET") {
    return fetch(url, {
      method,
    });
  } else {
    return fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
};
