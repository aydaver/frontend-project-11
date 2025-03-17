export default (xml) => {
    try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    return doc;
    }
    catch (error) {
        console.error(`Ошибка парсинга: ${error}`);
        const p = document.getElementById('underMassage');
        p.textContent = `Ошибка парсинга: ${error}`;
        p.style.color = 'red';
    }
}