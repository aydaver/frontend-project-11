/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import axios from 'axios';
import parseToDoc from './parser.js';
import { addListToPage, validate, addNewItemToPage } from './view.js';
import messages from './locales/ru.js';

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
        const newTitles = newDoc.querySelectorAll('title');
        newTitles.forEach((titleItem) => {
          titleItem.id = `title${titleItem.parentElement.id}`;
        });
        const newDescriptions = newDoc.querySelectorAll('description');
        newDescriptions.forEach((descriptionItem) => {
          descriptionItem.id = `description${descriptionItem.parentElement.id}`;
        });
        const newLinks = newDoc.querySelectorAll('link');
        newLinks.forEach((linkItem) => {
          linkItem.id = `link${linkItem.parentElement.id}`;
        });
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

export default document.addEventListener('DOMContentLoaded', () => {
  const scheme = yup.object({
    url: yup.string().url(),
  });
  const form = document.getElementById('form');
  const input = document.querySelector('input');

  const rssArray = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const obj = { url: input.value };
    scheme.isValid(obj)
      .then((result) => {
        validate(result, input);
      });
    console.log(rssArray);
    getNewPost(getProxy(input.value))
      .then((response) => {
        const doc = parseToDoc(response.data.contents);
        const items = doc.querySelectorAll('item');
        const itemArray = [];
        console.log(items);
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
          linkItem.id = `link${linkItem.parentElement.id}`;
        });
        console.log(titles, descriptions, links);
        if (response.data.status.error !== undefined) {
          const error = response.data.status.error.name;
          const p = document.getElementById('underMessage');
          p.textContent = `${messages.connectionError} ${error}`;
          p.style.color = 'red';
          setTimeout(() => {
            p.textContent = messages.exampleUrl;
            p.style.color = 'black';
          }, 5000);
        } else {
          const p = document.getElementById('underMessage');
          const postsTitle = document.getElementById('postsTitle');
          p.textContent = messages.successAdd;
          p.style.color = 'green';
          postsTitle.style.display = 'block';
        }
        const postList = document.getElementById('postList');
        if (rssArray.includes(input.value)) {
          const p = document.getElementById('underMessage');
          p.textContent = messages.rssAdded;
          p.style.color = 'red';
          checkForUpdate(input.value, itemArray);
        } else if (!rssArray.includes(input.value)) {
          items.forEach((item, index) => {
            item.id = index;
            itemArray.push(item);
          });
          addListToPage(doc, postList);
          rssArray.push(input.value);
          checkForUpdate(input.value, itemArray);
        }
      });
    console.log(rssArray);
  });
});
