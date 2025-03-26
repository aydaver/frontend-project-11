import messages from '../locales/ru.js';

export default (xml) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    return doc;
  } catch (error) {
    console.error(messages.parsingError);
    const p = document.getElementById('underMessage');
    p.textContent = messages.parsingError;
    p.style.color = 'red';
    return error;
  }
};
