import { HTTPOptions } from "./models/httpOptions";
import { METHODS } from "./models/httpMethod";

function queryStringify(data: {}) {
  let urlParameters =
    "?" +
    Object.entries(data)
      .map((e) => e.join("="))
      .join("&");

  return urlParameters;
}

class HTTPTransport {
  get(url: string, options: HTTPOptions) {
    return this.request(url, { ...options, method: METHODS.GET });
  }
  post(url: string, options: HTTPOptions) {
    return this.request(url, { ...options, method: METHODS.POST });
  }
  put(url: string, options: HTTPOptions) {
    return this.request(url, { ...options, method: METHODS.PUT });
  }
  patch(url: string, options: HTTPOptions) {
    return this.request(url, { ...options, method: METHODS.PATCH });
  }
  delete(url: string, options: HTTPOptions) {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request(url: string, options: HTTPOptions) {
    const { method, data, headers = {}, timeout = 5000 } = options;
    const query = method === METHODS.GET ? queryStringify(data) : "";
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url + query);
      xhr.onload = () => resolve(xhr);
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log(`Ответ от сервера: ${xhr.status} | ${xhr.statusText}`);
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(query);
      }
    });
  }
}
