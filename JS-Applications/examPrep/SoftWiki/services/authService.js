import login from '../views/login.js';
import register from '../views/register.js'
import request from './request.js';
import setUser from './authorisedUser.js'

const apiKey = "AIzaSyBun_fyr7SlczVG5PPlwdnjNlaMyIw9qmY";

let endpoints = {
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
}

export default {
    async login(email, password) { // Тази функция ще се експортне във eventListener.js.В нея се използва request-а от request.js
        let data = await request.post(endpoints.login, {
            email,
            password,
        });

        localStorage.setItem('auth', JSON.stringify(data));
        localStorage.setItem('email', data.email);

        return data;
    },

    async register(email, password) {
        let data = await request.post(endpoints.register, {
            email,
            password,

        });

        localStorage.setItem('auth', JSON.stringify(data));
        // console.log(data);
        return data;
    },

    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));
            // console.log(data);
            return {
                isAuthenticated: Boolean(data.idToken), // С isAuthenticated ще правя проверка за аутентикация .
                email: data.email,
                idToken: data.idToken,

            };
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ''
            };
        }
    },

    logout() {
        localStorage.setItem('auth', '');
        console.log('Out!!!');
    },
};