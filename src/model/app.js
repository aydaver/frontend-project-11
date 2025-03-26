/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import axios from 'axios';
import parseToDoc from './parser.js';
import {
  addListToPage,
  validate,
  addNewItemToPage,
  createFeed,
} from '../view/view.js';
import messages from '../locales/ru.js';

const getProxy = (url) => {
  const proxy = new URL('/get', 'https://allorigins.hexlet.app');
  proxy.searchParams.set('disableCache', true);
  proxy.searchParams.set('url', url);
  return proxy.toString();
};

const getNewPost = (url) => axios.get(url);

const checkForUpdate = (url, itemArray) => {
  setTimeout(
    () => getNewPost(getProxy(url))
      .then((response) => {
        const newDoc = parseToDoc(response.data.contents);
        const newItems = newDoc.querySelectorAll('item');

        const resultArr = [];
        newItems.forEach((item) => {
          itemArray.forEach((arrayItem) => {
            if (item.firstChild.textContent === arrayItem.firstChild.textContent) {
              resultArr.push(true);
            } else {
              resultArr.push(false);
            }
          });
        });
        let i = 0;
        resultArr.forEach((element) => {
          if (element === true) {
            i += 1;
          }
        });
        const newList = newDoc.createElement('div');
        const postList = document.getElementById('postList');
        if (i < itemArray.length) {
          const newestItem = newItems[0];
          itemArray.splice(9, 1);
          itemArray.unshift(newestItem);
          newList.append(newestItem);
          addNewItemToPage(newList.firstChild, postList);
        }
        checkForUpdate(url, itemArray);
      }),
    5000,
  );
};

const scheme = yup.object({
  url: yup.string().url(),
});
const form = document.getElementById('form');
const input = document.querySelector('input');

const rssArray = [];

export default form.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = { url: input.value };
  scheme.isValid(obj)
    .then((result) => {
      validate(result, input);
      if (result === true) {
        getNewPost(getProxy(input.value))
          .then((response) => {
            const doc = parseToDoc(response.data.contents);
            const items = doc.querySelectorAll('item');
            const itemArray = [];
            const titles = doc.querySelectorAll('title');
            const descriptions = doc.querySelectorAll('description');
            const p = document.getElementById('underMessage');
            const { status } = response.data.status;
            console.log(status);
            if (Object.hasOwn(status, 'error')) {
              p.textContent = messages.connectionError;
              console.log('boobs');
              p.classList.add('text-danger', 'visible');
              setTimeout(() => {
                p.textContent = messages.exampleUrl;
                p.classList.remove('text-danger');
              }, 5000);
            } else if (doc.lastChild.localName === 'parsererror') {
              p.textContent = messages.noValid;
              p.classList.add('text-danger', 'visible');
              input.classList.add('is-invalid');
            } else {
              const postsTitle = document.getElementById('postsTitle');
              const feedsTitle = document.getElementById('feedsTitle');
              p.textContent = messages.successAdd;
              p.classList.add('text-success', 'visible');
              p.classList.remove('text-danger');
              input.classList.remove('is-invalid');
              feedsTitle.style.display = 'block';
              postsTitle.style.display = 'block';
              const postList = document.getElementById('postList');
              if (rssArray.includes(input.value)) {
                p.textContent = messages.rssAdded;
                p.classList.add('text-danger');
                p.classList.remove('text-success');
                input.classList.add('is-invalid');
                checkForUpdate(input.value, itemArray);
              } else if (!rssArray.includes(input.value)) {
                items.forEach((item, index) => {
                  item.id = index;
                  itemArray.push(item);
                });
                addListToPage(doc, postList);
                rssArray.push(input.value);
                checkForUpdate(input.value, itemArray);
                createFeed(titles, descriptions);
              }
            }
          });
      }
    });
});
