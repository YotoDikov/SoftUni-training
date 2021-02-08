export default function getHome({load, partial}){
    console.log('im here');
    const loggedUser = localStorage.getItem('isLogged');

    if(loggedUser) {
        const { email, uid } = JSON.parse(loggedUser);
        this.loggedIn = true;
        this.email = email;
    }

    load({
        'header': './templates/common/header.hbs',
        'footer': './templates/common/footer.hbs'
    }).then(function () {
        partial('./templates/home/home.hbs');
    })
    
    
}
// export const getHome2 = (context) => {
//     console.log('Krisko vliza');
 
//     const loggedUser = localStorage.getItem('isLogged');

//     if(loggedUser) {
//         const { email, uid } = JSON.parse(loggedUser);
//         context.loggedIn = true;
//         context.email = email;
//     }
//     console.log(context);
//     // context.partial('./templates/home/home.hbs');

//     context.loadPartials({
//         'header': './templates/common/header.hbs',
//         'footer': './templates/common/footer.hbs'
//     }).then((res) => {
//         console.log(res);
//         context.partial('./templates/home/home.hbs');
//     })
    
// }
