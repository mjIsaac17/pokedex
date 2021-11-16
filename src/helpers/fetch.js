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

export const fetchAll = (endpoint, data = {}) => {
  const url = `${baseUrl}/${endpoint}`;

  return Promise.all(data.map((item) => fetch(`${url}/${item}`))).then(
    (responses) =>
      Promise.all(responses.map((res) => res.json())).then((results) => results)
  );
};
