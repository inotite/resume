// services with session
var authHeaders = setAuthHeaders();

function doGetWithEncrypt(url) {
    console.log(url, authHeaders);
    return axios.get(url, authHeaders)
        .then(function (response) {
            console.log(":::::::::::json get responce:::::", response);
            if (response.status == 200) {
                // handle success
                return JSON.parse(decrypt(response.data, sessionId));
            };
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return JSON.parse(decrypt(error.data, sessionId));
        });
};

function doPostWithEncrypt(url, payload) {
    payload = encrypt(JSON.stringify(payload), sessionId);
    return axios.post(url, payload, authHeaders)
        .then(function (response) {
            // handle success
            // console.log(decrypt(response, token));
            return JSON.parse(decrypt(response.data, sessionId));
        })
        .catch(function (error) {
            // handle error
            // console.log(decrypt(error, sessionId));
            return JSON.parse(decrypt(error.data, sessionId));
        });
};

function doUpload(url, payload) {
    return axios.post(url, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Token': sessionId
            }
        })
        .then(function (response) {
            // handle success
            // console.log(decrypt(response, token));
            return response.data;
        })
        .catch(function (error) {
            // handle error
            // console.log(decrypt(error, sessionId));
            return error;
        });
}
// services with out session
var withOutAuthHeaders = setHeaders();

function doGetWithOutAuth(url) {
    console.log(url);
    return axios.get(url, withOutAuthHeaders)
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                // handle success
                return JSON.parse(decrypt(response.data, authToken));
            };
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return JSON.parse(decrypt(error.data, authToken));
        });
};

function doPostWithOutAuth(url, payload) {
    console.log(payload);
    payload = encrypt(JSON.stringify(payload), authToken);
    console.log(payload, withOutAuthHeaders);
    return axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json',
                "Token": authToken
            }
        })
        .then(function (response) {
            console.log("response", response);
            // handle success
            // console.log(decrypt(response, token));
            return JSON.parse(decrypt(response.data, authToken));
        })
        .catch(function (error) {
            // handle error
            // console.log(decrypt(error, sessionId));
            return JSON.parse(decrypt(error.data, authToken));
        });
};
// services with password
var withOutAuthHeaders = setHeaders();

function doGetWithAuthKey(url) {
    console.log(url);
    return axios.get(url, withOutAuthHeaders)
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                // handle success
                return JSON.parse(decrypt(response.data, 'password'));
            };
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return JSON.parse(decrypt(error.data, authToken));
        });
};

function doPostWithAuthKey(url, payload) {
    console.log(payload);
    payload = encrypt(JSON.stringify(payload), 'password');
    console.log(payload, withOutAuthHeaders);
    return axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json',
                "Token": authToken
            }
        })
        .then(function (response) {
            console.log("response", response);
            // handle success
            // console.log(decrypt(response, token));
            return JSON.parse(decrypt(response.data, authToken));
        })
        .catch(function (error) {
            // handle error
            // console.log(decrypt(error, sessionId));
            return JSON.parse(decrypt(error.data, authToken));
        });
};
var iv = CryptoJS.enc.Hex.parse(0x00);

function encrypt(message, key) {
    var encryptedString = CryptoJS.AES.encrypt(message, CryptoJS.enc.Latin1.parse(CryptoJS.enc.Latin1.stringify(CryptoJS.SHA256(key))), {
        iv: iv
    }).toString();
    console.log(encryptedString);
    return encryptedString;
}

function decrypt(message, key) {
    console.log(message, key);
    if (message && key) {
        var decryptString = CryptoJS.AES.decrypt(message, CryptoJS.enc.Latin1.parse(CryptoJS.enc.Latin1.stringify(CryptoJS.SHA256(key))), {
            iv: iv
        }).toString(CryptoJS.enc.Utf8);
        console.log(decryptString);
        return decryptString;
    }
}

//auth headers 
function setAuthHeaders() {
    return {
        headers: {
            "Content-Type": 'application/json',
            "Token": sessionId
        }
    }
}
//un-auth headers 
function setHeaders() {
    return {
        headers: {
            "Content-Type": 'application/json',
            "Token": authToken
        }
    }
}