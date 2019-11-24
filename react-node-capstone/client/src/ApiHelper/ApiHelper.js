

exports.get = (url, callback) => {

    fetch(url, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return res.json();
    }).then((res) => {
        callback(res);
    }).catch((err) => { 
        callback({"success": false, "err": "CATCH ERROR: " + err})
    });
};

exports.uploadFile = (url, file, callback) => {

    let data = new FormData();
    data.append('file', file);

    fetch(url, {
        method: 'POST',
        body: data,
        credentials: "include",
        headers: {

        }
    }).then(res => {
        return res.json();
    }).then((res) => {
        callback(res);
    }).catch((err) => {
        callback({"success": false, "err": err})
    });
};


exports.post = (url, jsonData, callback) => {

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonData),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return res.json();
    }).then((res) => {
            callback(res);
    }).catch((err) => {
        callback({"success": false, "err": err})
    });
};
