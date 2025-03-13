const validate = (isValid, input) => {
    if (isValid === true) {
        input.style.border = null;
        const p = document.getElementById('underMassage');
        p.textContent = 'Подключение...';
        p.style.color = 'black';
    } else if (isValid === false) {
        input.style.border = 'solid red';
        const p = document.getElementById('underMassage');
        p.textContent = 'Некорректная ссылка! Попробуйте снова!';
        p.style.color = 'red'
        setTimeout(() => {
            p.textContent = 'Пример: https://lorem-rss.hexlet.app/feed';
            p.style.color = 'black';
        }, 5000)
    }
};

const connectionErrorView = (error) => {

}

const addListToPage = (doc, container) => {
    const items = doc.querySelectorAll('item');
    items.forEach((item) => {
        const element = document.createElement('li');
        element.id = `item${item.id}`
        element.style.fontSize = '22px';
        element.style.marginTop = '40px';
        const a = document.createElement('a');
        a.href = doc.getElementById(`link${item.id}`).textContent;
        a.textContent = doc.getElementById(`title${item.id}`).textContent;
        element.append(a);
        const button = document.createElement('button');
        button.id = `openModal${item.id}`;
        button.textContent = 'Посмотреть';
        button.style.marginLeft = '40px';
        element.append(button);
        const description = doc.getElementById(`description${item.id}`).textContent;
        const link = doc.getElementById(`link${item.id}`).textContent;
        button.addEventListener('click', () => {
            modalWindow(description, link);
        })
        container.appendChild(element);
    })

}
const modalWindow = (description, link) => {
    const modal = document.querySelector('#modal');
    const modalContent = document.getElementsByClassName('modal-content')[0];
    const close = document.querySelector('.close');
    const seeMore = document.getElementById('seeMore');
    seeMore.action = link;
    const descriptionContent = document.getElementById('descriptionContent');
    descriptionContent.textContent = description;

    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';

    modalContent.style.backgroundColor = 'magenta';
    modalContent.style.margin = '0 20% 0 20%';
    modalContent.style.borderRadius = '20px';
    modalContent.style.height = '200px'
    modalContent.style.textAlign = 'center'
    modalContent.style.padding = '80px 0 0 0'

    seeMore.style.marginBottom = '20px';

    close.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

export { validate, addListToPage, connectionErrorView };
