/* eslint-disable no-param-reassign */
import messages from '../locales/ru.js';

const validate = (isValid, input) => {
  if (isValid === true) {
    input.style.border = null;
    const p = document.getElementById('underMessage');
    p.classList.remove('text-danger', 'text-success');
    p.style.color = 'white';
    p.textContent = 'Подключение...';
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

  const body = document.querySelector('body');

  body.style.overflow = 'hidden';
  body.style.paddingRight = '17px';
  body.classList.add('modal-open');

  modal.style.display = 'block';
  modal.classList.add('show');
  const modalBackdrop = document.createElement('div');
  body.appendChild(modalBackdrop);
  modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');

  close.onclick = () => {
    modal.style.display = 'none';
    modal.classList.remove('show');
    body.style.overflow = 'auto';
    body.style.paddingRight = '0';
    modalBackdrop.remove();
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      body.style.overflow = 'auto';
      body.style.paddingRight = '0';
      modalBackdrop.remove();
    }
  };
};

const addListToPage = (doc, container) => {
  let items = doc.querySelectorAll('item');
  items = [...items];
  items = items.reverse();
  items.forEach((item) => {
    const element = document.createElement('li');
    element.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.href = item.querySelector('link').textContent;
    a.textContent = item.querySelector('title').textContent;
    element.append(a);
    const button = document.createElement('button');
    button.id = `openModal${item.id}`;
    button.textContent = 'Просмотр';
    button.style.marginLeft = '40px';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    element.append(button);
    const description = item.querySelector('description');
    const link = item.querySelector('link');
    const title = item.querySelector('title');
    a.classList.add('fw-bold');
    button.addEventListener('click', () => {
      modalWindow(title.textContent, description.textContent, link.textContent);
      a.classList.add('fw-normal');
      a.classList.add('link-secondary');
      a.classList.remove('fw-bold');
    });
    container.insertBefore(element, container.firstChild);
  });
};

const addNewItemToPage = (item, container) => {
  const element = document.createElement('li');
  element.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  element.id = `item${item.id}`;
  const a = document.createElement('a');
  a.href = item.querySelector('link').textContent;
  a.textContent = item.querySelector('title').textContent;
  element.append(a);
  const button = document.createElement('button');
  button.id = `openModal${item.id}`;
  button.textContent = 'Просмотр';
  button.style.marginLeft = '40px';
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  element.append(button);
  const description = item.querySelector('description');
  const link = item.querySelector('link');
  const title = item.querySelector('title');
  a.classList.add('fw-bold');
  button.addEventListener('click', () => {
    modalWindow(title.textContent, description.textContent, link.textContent);
    a.classList.add('fw-normal');
    a.classList.add('link-secondary');
    a.classList.remove('fw-bold');
  });
  container.insertBefore(element, container.firstChild);
};

const createFeed = (titles, descriptions) => {
  const feedsList = document.getElementById('feedsList');
  const feed = document.createElement('li');
  const feedTitle = document.createElement('p');
  const feedDescription = document.createElement('p');
  feed.classList.add('list-group-item', 'border-0', 'border-end-0');
  feedTitle.textContent = titles[0].textContent;
  feedTitle.classList.add('h6', 'm-0');
  feedDescription.textContent = descriptions[0].textContent;
  feedDescription.classList.add('m-0', 'small', 'text-black-50');
  feed.append(feedTitle, feedDescription);
  feedsList.prepend(feed);
};

export {
  validate,
  addListToPage,
  addNewItemToPage,
  createFeed,
};
