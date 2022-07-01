import axios from 'axios';


const peliculaBd = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '1e49446da98a104466d148a6578fc8f2',
        language: 'es-ES'
    }
});


export default peliculaBd;


