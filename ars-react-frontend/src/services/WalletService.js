import API from "./Api";

const getWallet = (userId) => {
    return API.get(`/wallets/user/${userId}`);
};

const addMoney = (userId, amount) => {
    return API.post(`/wallets/user/${userId}/add?amount=${amount}`);
};

export default {

    getWallet,

    addMoney

};