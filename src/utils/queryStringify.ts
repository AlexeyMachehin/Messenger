export function queryStringify(data: {}) {
    let urlParameters =
      "?" +
      Object.entries(data)
        .map((e) => e.join("="))
        .join("&");
  
    return urlParameters;
  }
