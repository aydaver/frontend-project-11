const inputBorder = (isValid, input) => {
    if (isValid === true) {
        input.style.border = null;
    } else if (isValid === false) {
        input.style.border = 'solid red';
    }
};

export default inputBorder;
