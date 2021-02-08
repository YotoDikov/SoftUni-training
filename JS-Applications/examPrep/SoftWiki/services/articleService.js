import request from './request.js';
import authService from './authService.js';

const baseUrl = 'https://softwiki-b3b94-default-rtdb.firebaseio.com';

const urlBuilder = (resource) => {
    return `${baseUrl}/${resource}.json?auth=${authService.getData().idToken}`
}

export default {
    async getAll() {
        // console.log(urlBuilder('articles'));
        let articles = await request.get(urlBuilder('articles'));
        // console.log(articles);
        if (!articles) {

            return
        }
        let data = Object.keys(articles).map(key => ({ _id: key, ...articles[key] }));
        // console.log(data);
        return data
    },

    async getOne(params) {
        let article = await request.get(urlBuilder('articles/' + params.id));

        return { article, articleId: params.id };
    },

    async deleteOneArticle(id) {
        let article = await request.delete(urlBuilder('articles/' + id));
        return article;
    },

    async create(article) {
        // article.creator = localStorage.getItem('email')
        let res = await request.post(urlBuilder('articles'), article)
        console.log(article);
        return res;
    },



};