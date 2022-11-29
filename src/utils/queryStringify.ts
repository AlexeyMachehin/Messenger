export function queryStringify(data: {}) {
  const urlParameters =
    "?" +
    Object.entries(data)
      .map((e) => e.join("="))
      .join("&");

  return urlParameters;
}
