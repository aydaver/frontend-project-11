/* eslint-disable no-param-reassign */
import messages from './locales/ru.js';

const validate = (isValid, input) => {
  if (isValid === true) {
    input.style.border = null;
    const p = document.getElementById('underMessage');
    p.textContent = 'Подключение...';
    p.style.color = 'white';
  } else if (isValid === false) {
    input.style.border = 'solid red';
    const p = document.getElementById('underMessage');
    p.textContent = messages.urlValidate;
    p.style.color = 'red';
    setTimeout(() => {
      p.textContent = messages.exampleUrl;
      p.style.color = 'white';
    }, 5000);
  }
};

const modalWindow = (title, description, link) => {
  const modal = document.querySelector('#modal');
  const close = document.querySelector('.close');
  const seeMore = document.getElementById('seeMore');
  seeMore.action = link;
  const titleContent = document.getElementById('titleContent');
  titleContent.textContent = title;
  const descriptionContent = document.getElementById('descriptionContent');
  descriptionContent.textContent = description;

  modal.style.display = 'flex';

  close.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
};

const addListToPage = (doc, container) => {
  let items = doc.querySelectorAll('item');
  items = [...items];
  items = items.reverse();
  items.forEach((item) => {
    const element = document.createElement('li');
    element.classList.add('post');
    const a = document.createElement('a');
    a.href = item.querySelector('link').textContent;
    a.textContent = item.querySelector('title').textContent;
    element.append(a);
    const button = document.createElement('button');
    button.id = `openModal${item.id}`;
    button.textContent = 'Просмотр';
    button.style.marginLeft = '40px';
    button.classList.add('btn');
    button.classList.add('see-btn');
    element.append(button);
    const description = item.querySelector('description');
    const link = item.querySelector('link');
    const title = item.querySelector('title');
    a.classList.add('fw-bold');
    button.addEventListener('click', () => {
      modalWindow(title.textContent, description.textContent, link.textContent);
      a.classList.add('fw-normal');
      a.classList.remove('fw-bold');
    });
    container.insertBefore(element, container.firstChild);
  });
};

const addNewItemToPage = (item, container) => {
  const element = document.createElement('li');
  element.classList.add('post');
  element.id = `item${item.id}`;
  const a = document.createElement('a');
  a.href = item.querySelector('link').textContent;
  a.textContent = item.querySelector('title').textContent;
  element.append(a);
  const button = document.createElement('button');
  button.id = `openModal${item.id}`;
  button.textContent = 'Просмотр';
  button.style.marginLeft = '40px';
  button.classList.add('btn');
  button.classList.add('see-btn');
  element.append(button);
  const description = item.querySelector('description');
  const link = item.querySelector('link');
  const title = item.querySelector('title');
  a.classList.add('fw-bold');
  button.addEventListener('click', () => {
    modalWindow(title.textContent, description.textContent, link.textContent);
    a.classList.add('fw-normal');
    a.classList.remove('fw-bold');
  });
  container.insertBefore(element, container.firstChild);
};

const createFeed = (titles, descriptions) => {
  const feedsList = document.getElementById('feedsList');
  const feed = document.createElement('li');
  const feedTitle = document.createElement('p');
  const feedDescription = document.createElement('p');
  feedTitle.textContent = titles[0].textContent;
  feedTitle.classList.add('feed-title');
  feedDescription.textContent = descriptions[0].textContent;
  feedDescription.classList.add('feed-description');
  feed.append(feedTitle, feedDescription);
  feedsList.prepend(feed);
};

export {
  validate,
  addListToPage,
  addNewItemToPage,
  createFeed,
};
