// Run JavaScript code as part of your test. Below is a short example to get you started.
const axios = require("axios");

// module.exports = (search) => {

//     const options = {
//       method: 'GET',
//       url: 'https://jikan1.p.rapidapi.com/search/anime',
//       params: {q: search},
//       headers: {
//         'X-RapidAPI-Host': 'jikan1.p.rapidapi.com',
//         'X-RapidAPI-Key': '720123e759msha0e6aa47cf024fap1966cejsn123c37d32083'
//       }
//     };
    

//     axios.request(options).then(function (response) {
//         // console.log("Searching for );
//         console.log(response.data.results);
//     }).catch(function (error) {
//         console.error(error);
//     });
// }

module.exports = (search) => {
    return axios.get(`https://jikan1.p.rapidapi.com/search/anime`, {
        params: {
            q: search
        },
        headers: {
            "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
            "X-RapidAPI-Key": "720123e759msha0e6aa47cf024fap1966cejsn123c37d32083"
        }
    })
}