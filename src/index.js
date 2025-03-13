import * as yup from 'yup';
import axios from 'axios';
import parseToDoc from './parser.js';
import { addListToPage, validate, connectionErrorView } from './view.js';

export default document.addEventListener('DOMContentLoaded', function() {
    const scheme = yup.object({
        url: yup.string().url()
    });
    const form = document.getElementById('form');
    const input = document.querySelector('input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const obj = { url: input.value };
        scheme.isValid(obj)
            .then((result) => {
                validate(result, input);
            });
        getNewPost(getProxy(`${input.value}`))
            .then((response) => {
                const doc = parseToDoc(response.data.contents);
                const items = doc.querySelectorAll('item');
                items.forEach((item, index) => {
                    item.id = index;
                });
                const titles = doc.querySelectorAll('title');
                titles.forEach((titleItem) => {
                    titleItem.id = `title${titleItem.parentElement.id}`;
                });
                const descriptions = doc.querySelectorAll('description');
                descriptions.forEach((descriptionItem) => {
                    descriptionItem.id = `description${descriptionItem.parentElement.id}`;
                });
                const links = doc.querySelectorAll('link');
                links.forEach((linkItem) => {
                    linkItem.id = `link${linkItem.parentElement.id}`
                });
                console.log(titles, descriptions, links);
                console.log(response.data.status.error)
                if (response.data.status.error !== undefined) {
                    const error = response.data.status.error.name;
                    const p = document.getElementById('underMassage');
                    p.textContent = `Ошибка подключения: ${error}`;
                    p.style.color = 'red';
                    setTimeout(() => {
                        p.textContent = 'Пример: https://lorem-rss.hexlet.app/feed';
                        p.style.color = 'black';
                    }, 5000);
                } else {
                    const p = document.getElementById('underMassage');
                    const postsTitle = document.getElementById('postsTitle');
                    p.textContent = 'RSS Успешно загружен!';
                    p.style.color = 'green';
                    postsTitle.style.display = 'block';
                }
                const postList = document.getElementById('postList');
                addListToPage(doc, postList);
                
            })
    });
});

const getProxy = (url) => {
    const proxy = new URL ('/get', 'https://allorigins.hexlet.app');
    proxy.searchParams.set('disableCache', true);
    proxy.searchParams.set('url', url);
    return proxy.toString();
};

const getNewPost = (url) => {
    return axios.get(url);
};
