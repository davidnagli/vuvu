let requestor = {};

/**
 * Creates and sends a GET request, returns a promise
 * @param url {String}
 * @returns {Promise}
 */
requestor.get = (url) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function () {
            if(request.readyState === 4){
                if(request.status === 200){
                    resolve(request.response)
                }else{
                    reject({code: request.status, content: request.response})
                }
            }
        };
        request.send();
    })
};

/**
 * Creates and sends a POST request, returns a promise
 * @param url {String}
 * @param data {String | Object}
 * @returns {Promise}
 */
requestor.post = (url, data) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", url);

        //stuff to handle sending JSON
        let dataToSend = data;
        if(typeof data === "object"){
            request.setRequestHeader("Content-type", "application/json");
            dataToSend = JSON.stringify(data);
        }

        request.onreadystatechange = function () {
            if(request.readyState === 4){
                if(request.status === 200){
                    resolve(request.response)
                }else{
                    reject({code: request.status, content: request.response})
                }
            }
        };
        request.send(dataToSend);
    })
};

requestor.getAPIData = (url, method, data) => {
    return new Promise((resolve, reject) => {
        if(method && method.toLowerCase() === "post"){
            requestor.post(url, data).then(JSON.parse).then(res => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }else{
            requestor.get(url).then(JSON.parse).then(res => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }
    })
};