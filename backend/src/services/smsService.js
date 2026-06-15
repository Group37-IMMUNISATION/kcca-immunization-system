const sendSMS = async (
    phoneNumber,
    message
) => {

    console.log('SMS TO:', phoneNumber);

    console.log('MESSAGE:', message);

    return true;
};

module.exports = {
    sendSMS
};