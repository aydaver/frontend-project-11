import * as yup from 'yup'
import inputBorder from './view.js'
import axios from 'axios';

export default document.addEventListener('DOMContentLoaded', function() {
    const scheme = yup.object({
        url: yup.string().url()
    })
    const form = document.getElementById('form');
    const input = document.querySelector('input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const obj = { url: input.value };
        scheme.isValid(obj).then((result) => {
            inputBorder(result, input)
            console.log(rssGet(`https://allorigins.hexlet.app/get?disableCache=true&url=${input.value}`))
        });
    });

});

const rssGet = (url) => {
    axios.get(url)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Ошибка запроса:', error);
    });
}