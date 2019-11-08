

function getEmailList(emailString) {
    if (emailString == null || emailString.length === 0) {
        return [];
    }
    const emails = emailString.split(",");

    return emails;
}

module.exports = {
    getEmailList
};