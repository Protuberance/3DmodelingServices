const checkValid = () => {
    const telInputs = document.querySelectorAll('input');

    telInputs.forEach((elem) => {

        if (elem.type === 'tel') {
            elem.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d\+]/, '');
            });
        } else if (elem.placeholder === 'Ваше имя' || elem.placeholder === 'Ваше сообщение') {
            elem.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^А-Я\s]/i, '');
            });
        }
    });
};

export default checkValid;