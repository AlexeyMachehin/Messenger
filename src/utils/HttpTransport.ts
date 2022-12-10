import { HTTPOptions, HTTPOptionsPost } from "./models/httpOptions";
import { METHODS } from "./models/httpMethod";
import { queryStringify } from "./queryStringify";

export class HTTPTransport {
  mainUrl = process.env.YANDEX_PRAKTIKUM_API;

  get<T>(url: string, options?: HTTPOptionsPost) {
    if (options && options.data) {
      url = url + queryStringify(options.data);
    }
    return this.request<T>(this.mainUrl + url, {
      method: METHODS.GET,
    });
  }
  post<T>(url: string, options: HTTPOptionsPost): Promise<T> {
    return this.request(this.mainUrl + url, {
      ...options,
      method: METHODS.POST,
    });
  }
  put<T>(url: string, options: HTTPOptionsPost): Promise<T> {
    return this.request(this.mainUrl + url, {
      ...options,
      method: METHODS.PUT,
    });
  }
  patch(url: string, options: HTTPOptions) {
    return this.request(this.mainUrl + url, {
      ...options,
      method: METHODS.PATCH,
    });
  }
  delete<T>(url: string, options: HTTPOptionsPost): Promise<T> {
    return this.request(this.mainUrl + url, {
      ...options,
      method: METHODS.DELETE,
    });
  }

  private request<F>(url: string, options: HTTPOptions): Promise<F> {
    const {
      method,
      data,
      headers = {
        "content-type": "application/json",
        "X-XSS-Protection": "1; mode=block",
      },
      withCredentials = true,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = "json";
      Object.entries(headers).forEach(([key, value]) => {
        return xhr.setRequestHeader(key, value);
      });

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }

        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
