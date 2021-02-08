import { html, render } from './node_modules/lit-html/lit-html.js';

import authService from './services/authService.js';
import articleService from './services/articleService.js';

import { onLoginSubmit, onRegisterSubmit, onCreateSubmit, onDeleteArticle } from './eventListeners.js';
import register from './views/register.js'
import layout from './views/layout.js';
import home from './views/home.js';
import login from './views/login.js';
import notFound from './views/not-found.js';
import createAticle from './views/create-article.js';
// import noArticlesYet from './views/no-articles-yet.js'
import articleDetails from './views/article-details.js';

const routes = [
    {
        path: '/',
        template: (props) => {
            let template = home;
            let url = '/';

            if (!props.isAuthenticated) {
                template = login;
                url = '/login'
            }

            history.pushState({}, '', url);//Слагам history.pushState зада смени урл-а и задаможе раутъра да го обработва. 

            return template(props)
        },
        getData: articleService.getAll
    },
    {
        path: '/logout',
        template: (props) => {
            authService.logout();

            history.pushState({}, '', '/');

            return login(props);
        }
    },
    {
        path: '/login',
        template: login,

    },
    {
        path: '/register',
        template: register,
    },
    // {
    //     path: '/noArticles',
    //     template: noArticlesYet
    // },
    {
        path: '/not-found',
        template: notFound
    },
    {
        path: '/create',
        template: createAticle,
        context: {
            onCreateSubmit
        }
    },
    {
        path: '/details/(?<id>\.+)',
        template: (props) => {
            let template = articleDetails;
            return template(props)
        },
        getData: articleService.getOne

    }
];

const router = (path) => {  //router е функция, която приема payh и набазата на този path ще рендерира темплейти.
    history.pushState({}, '', path); // history.pushState() променя pathname-а във урл-а .Подават му се - празен обект{}, празен стринг'' и path(пътя за рутиране)

    let route = routes.find(x => new RegExp(`^${x.path}$`, 'i').test(path)) || routes.find(x => x.path == '/not-found')
    let context = route.context;
    let params = new RegExp(`^${route.path}$`, 'i').exec(path).groups;
    let userData = authService.getData();
    // console.log(userdata);
    if (route.getData) {
        route.getData(params).then(data => {
            render(layout(route.template, { navigationHandler, onRegisterSubmit, onLoginSubmit, onDeleteArticle, ...userData, ...context, data, params }), document.getElementById('app')); //Във render() подаваме layout темплейта , защото във него са подередени всички темплейти , като childrens.Накрая със запетайка се подава селектирания html елемент, в който ше се налива целия html динамично. В случая това е div със id app.
        })
    }
    render(layout(route.template, { navigationHandler, onLoginSubmit, onRegisterSubmit, ...userData, ...context, params }), document.getElementById('app')); //Всички неща от горе, които са дефинирани в къдравите скоби за PROPS. Реално едва чак тук се дефинират props.  Render() е функция на lit-html. извиква се за редндериране на страниците. Подавам колбек функцията {navigationHandler} като обект, за да имам възможност да добавям и други неща, ако се наложи.
};

function navigationHandler(e) {
    if (e.target.tagName == 'A') {
        e.preventDefault();

        let url = new URL(e.target.href); // e.target.href ни връща целия линк ...http://localhost:3000/login примерно.Но зада рутираме успешно темплейтите ни трябва замо патнейма или /login в случая.Затова използзваме New URL()Той преобразува href-a в обект с разделени части от href-a. Така когато извикаме router-а ще можем да му подадем Url.pathname. pathname е пропърти на създадения от нас URL , който държи само /login.

        router(url.pathname); //Задължително накрая трябва да се извиква раутър функцията зада се изпълни.Извиква се със router(location.pathname) или както е в случая ulr вместо location.
    }
}


export default router;


//Идеята за раутъра...
//  -дефинираме routes
//  -извикваме route, който hadle-ва конкретен route от routes. По този начин взимаме и нужния темплейт, който в последствие ще рендерираме.
//  -Подаваме route на router и го стартираме