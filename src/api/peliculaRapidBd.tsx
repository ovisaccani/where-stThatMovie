import axios from 'axios';


const peliculaRapidBd = axios.create({
    baseURL: 'https://streaming-availability.p.rapidapi.com/get/basic',
    params: {country: 'ar', output_language: 'es'},
    headers: {
      'X-RapidAPI-Key': '80196c449fmsh10fbe909e88aafdp145850jsn235831a9ba0d',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
});


export default peliculaRapidBd;


