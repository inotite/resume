const token = sessionId ? sessionId : authToken;
axios.defaults.headers.common['Token'] = token;
var myString = "https://www.titanesmedellin.com/";
var myPassword = "myPassword";
// PROCESS
var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);

const doGetWithEncrypt = function (url) {
    console.log(url);
    return axios.get(url)
        .then(function (response) {
            if (response.status == 200) {
                // handle success
                console.log("response", response);
                // console.log("decryptTheEncryptData", decryptTheEncryptData(response.data, token));
                // return decryptTheEncryptData(response.data, token);
                return response.data;
            };
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return decryptTheEncryptData(error, sessionId);
        });
};
const doPostWithEncrypt = function (url, payload) {
    return axios.post(url, payload)
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
};

function decryptTheEncryptData(data, key) {
    console.log(data, key);
    const decrypted = CryptoJS.AES.decrypt(data, key);
    console.log(decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted;
}

function encryptTheDecryptData(data, key) {
    const encrypt = CryptoJS.AES.encrypt(data, key);
    return encrypt;
}
const res = "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";
// decryptTheEncryptData(res, token);