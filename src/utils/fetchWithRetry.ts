function fetchWithRetry(url, options) {
    function queryStringify(data) {
      let urlParameters =
        "?" +
        Object.entries(data)
          .map((e) => e.join("="))
          .join("&");
      console.log(urlParameters);
      return urlParameters;
    }
    const { method, data, headers = {}, timeout = 5000, retries = 5 } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
  
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(queryStringify(data));
      }
    }).catch(error => {
          if (!options.retries){
              throw error;
          }
   
          return fetchWithRetry(url, {...options, retries: options.retries - 1});
      })
  }
