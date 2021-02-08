import authService from './services/authService.js';
import articleService from './services/articleService.js';
import router from './router.js';

export const onCreateSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let title = formData.get('title');
    let category = formData.get('category');
    let content = formData.get('content');
    let author = localStorage.getItem('email')
    // console.log(author);

    articleService.create({
        title,
        category,
        content,
        author
    }).then(res => {
        router('/');
    });
};

export const onDeleteArticle = (e, id) => {
    e.preventDefault();

    let idArticle = id;
    articleService.deleteOneArticle(idArticle)
        .then(res => {

            console.log(`Element was deleted`);
            router('/');
        })
};

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    authService.login(email, password)
        .then(data => {
            console.log(`You are loggerd with ${data.email}`);
            router('/');
        })
};

export const onRegisterSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');


    authService.register(email, password)
        .then(data => {
            console.log(`Welcome, ${data.email}`);
            router('/');
        })
}
