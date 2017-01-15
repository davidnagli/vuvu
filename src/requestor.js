let requestor = {};

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

requestor.post = (url, data) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", url);
        request.onreadystatechange = function () {
            if(request.readyState === 4){
                if(request.status === 200){
                    resolve(request.response)
                }else{
                    reject({code: request.status, content: request.response})
                }
            }
        };
        request.send(data);
    })
};

requestor.getAPIData = (url) => {
    return new Promise((resolve, reject) => {
        requestor.get(url).then(JSON.parse).then(res => {
            resolve(res)
        }).catch(() => {
            resolve({})
        })
    })
}