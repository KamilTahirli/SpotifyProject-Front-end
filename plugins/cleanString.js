export default ({ app }, inject) => {
    const cleanString = (text) => {
        if (!text) return '';
        return text.replace(/[^\w\s.\-():/çşğüöıəİА-Яа-я]+/gi, '');
    };

    inject('cleanString', cleanString);
};
