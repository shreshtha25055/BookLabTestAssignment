const axios = require('axios');

const getData = () => {
    try {
        axios.get('https://5f1a8228610bde0016fd2a74.mockapi.io/getTestList') //
            .then(result => {
                console.log(result)
                return result
            })
            .catch(error => {
                console.log(error);
                return false
            });
    } catch (error) {
        return false
    }
}

module.exports = getData

