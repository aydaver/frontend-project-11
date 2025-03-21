import messages from './locales/ru.js';

export default (xml) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    return doc;
  } catch (error) {
    console.error(`Ошибка парсинга: ${error}`);
    const p = document.getElementById('underMessage');
    p.textContent = `${messages.parsingError} ${error}`;
    p.style.color = 'red';
    return error;
  }
};
