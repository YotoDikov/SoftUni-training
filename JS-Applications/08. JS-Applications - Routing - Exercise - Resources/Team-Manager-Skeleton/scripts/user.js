export function getHome(){
    console.log('im here');
    // const loggedUser = localStorage.getItem('isLogged');

    // if(loggedUser) {
    //     const { email, uid } = JSON.parse(loggedUser);
    //     context.loggedIn = true;
    //     context.email = email;
    // }

    // //Понеже във хоум телплейта са прикачени паршали(хедър и фуутър)ще ги     заредя със 'loadPartials()' функцията. Самата функциприема обект със  кей- хедър/фуутър и валю- пътят към темплеита. Ще използвам асинхронна функция, зада съм сигурен, че първо ще се заредят двата паршали и чак след това ще заредим 'home' темплейта.
    // this.loadPartials({
    //     'header': './templates/common/header.hbs',
    //     'footer': './templates/common/footer.hbs'
    // }).then(function () {
    //     this.partial('./templates/home/home.hbs');
    // })
    
    
}
export const getHome2 = (context) => {
    console.log('Krisko vliza');
 
    const loggedUser = localStorage.getItem('isLogged');

    if(loggedUser) {
        const { email, uid } = JSON.parse(loggedUser);
        context.loggedIn = true;
        context.email = email;
    }
    console.log(context);
    // context.partial('./templates/home/home.hbs');

    context.loadPartials({
        'header': './templates/common/header.hbs',
        'footer': './templates/common/footer.hbs'
    }).then((res) => {
        console.log(res);
        context.partial('./templates/home/home.hbs');
    })
    
}
