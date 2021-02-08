 import getHome from './user.js'
 // TODO
 //Ще създам константа , вкоято ще държа функцията firebase.auth(), която се използва от файърбейс за аутентикиране и записване на юзъри в базата данни.
const userMOdel = firebase.auth();

 //1. Създавам константа  'app', която ще съдържа функция 'Sammy()'.Тази функция ще визуализира HTML-а на уеб страницата. Самата функция ще съдържа  два параметъра: Първият параметър ще е пътят към руут елемента , в който ще се закачват темплейтите. Втория пратаметър ще е функция , която реално ще следи за промени в URL-а и ще рендерира съответните промени.
const app = Sammy('#main', function (context) {
  
    //Ще използвам 'this.use()'(функция на Sammy), с която ще кажа на Sammy да използва Handlebars за темплейт виуър.
    this.use('Handlebars', 'hbs');

    //GET заявки... Използват се за визуализиране на темплейтите.

    //2. home... Ще използвам 'this.get()' за всеки един темплейт. 'this.get()' взима за параметри името на темплейта и функцията , която ще го визуализира.
    this.get('#/home', function (context){

        const loggedUser = localStorage.getItem('isLogged');

        if(loggedUser) {
            const { email, uid } = JSON.parse(loggedUser);
            context.loggedIn = true;
            context.email = email;
        }

        //Понеже във хоум телплейта са прикачени паршали(хедър и фуутър)ще ги     заредя със 'loadPartials()' функцията. Самата функциприема обект със  кей- хедър/фуутър и валю- пътят към темплеита. Ще използвам асинхронна функция, зада съм сигурен, че първо ще се заредят двата паршали и чак след това ще заредим 'home' темплейта.
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        })
        
    });

    //2. catalog
    this.get('#/catalog', function(context) {

        const loggedUser = localStorage.getItem('isLogged');

        if(loggedUser) {
            const { email, uid } = JSON.parse(loggedUser);
            context.loggedIn = true;
            context.hasNoTeam = true;
            context.email = email;
        }

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'team': './templates/catalog/team.hbs'
        }).then(function (){
            this.partial('./templates/catalog/teamCatalog.hbs')
        })
    })

    //2. create
    this.get('#/create', function (context) {

        const loggedUser = localStorage.getItem('isLogged');

        if (loggedUser) {
            const { email, uid } = JSON.parse(loggedUser);
            context.loggedIn = true;
            context.hasNoTeam = true;
            context.email = email;
        }

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'createForm': './templates/create/createForm.hbs'
        }).then(function(){
            this.partial('./templates/create/createPage.hbs')
        })
    })

    //2. login
    this.get('#/login', function (){

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',

            //Добавям loginForm паршал, понеже login темплейта e зависим от него.
            'loginForm': './templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('./templates/login/loginPage.hbs');
        }) 
    });

    //2. about
    this.get('#/about', function (){

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/about/about.hbs');
        }) 
    });

    //2. register
    this.get('#/register', function (){

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',

            //Добавям registerForm паршал, понеже register темплейта е зависим от него.
            'registerForm': './templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs');
        }) 
    });

    //2. logout
    this.get('#/logout', function(context) {

        userMOdel.signOut()
            .then(() => {
                localStorage.removeItem('isLogged')
                console.log('success');

                context.redirect('#/home');
            })
            .catch((e) => console.log(e))
    });


    //POST заявки... Използват се за създаване и логване. Да, за логване се използва POST, а не GET. По-сейфти е.
    //2.1 register

    // Функцията post(), която в случая е функция на Sammy приема два аргумента: URL-а за регистъра и функция, която извършва регистрацията. Тя държи контекст със попълнените инпути за регистриране на потребител.
    this.post('#/register', function(context) {

        //Със context.params взимаме параметрите, които записваме в инпутите за мейл, пасуорд и репийт пасуорд.
        const { username, password } = context.params;

        //Функцияата createUserWithEmailAndPassword() идва ор файърбейс и се използва за съдаване на потребител.Функцията изисква два аргумента: узернейм и парола. тях ги набявяме от обекта { username, password}, които създадохме по-горе.
        userMOdel.createUserWithEmailAndPassword(username, password)
            .then((createUser) => {
                console.log(createUser);
            })
            .catch((e) => console.log(e));

        
    })

    //2.1 login... Същото, като регистрацията, самоче исползваме функцията signInWithEmailAndPassword(email, password).
    this.post('#/login', function(context) {

        const { username, password } = context.params;

        userMOdel.signInWithEmailAndPassword(username, password)
            .then(({user: {email, uid}}) => {
                
                localStorage.setItem('isLogged', JSON.stringify({ email, uid}))
                context.redirect('#/home');


            })
            .catch((e) => console.log(e))
    });


});

(() => {
    app.run('#/home');
})();





// this.post('#/login', function(context) {

//     const { username, password } = context.params;

//     userMOdel.signInWithEmailAndPassword(username, password)
//         .then((loginUser) => {
            
//             localStorage.setItem('isLogged', loginUser.user.uid)
//             console.log(loginUser);

//             const isLogged = localStorage.getItem('isLogged');
//             console.log(isLogged);
//             this.loadPartials({
//                 'header': './templates/common/header.hbs',
//                 'footer': './templates/common/footer.hbs',
    
//                 //Добавям loginForm паршал, понеже login темплейта e зависим от него.
//             }).then(function () {


//                 this.partial('./templates/home/home.hbs', { isLogged });
//             }) 
//         })
//         .catch((e) => console.log(e))
// });