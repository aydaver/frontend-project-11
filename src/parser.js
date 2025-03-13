export default (xml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    return doc;
}