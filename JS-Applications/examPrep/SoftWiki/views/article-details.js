import { html } from '../node_modules/lit-html/lit-html.js';

export default ({
    onDeleteArticle,
    data
}) => {
    let data2 = data ? data.article : null;
    let id = data ? data.articleId : null;
    return html`
    <!-- Details -->
    <div class="container details">
        <div class="details-content">
            <h2>${data2 ? data2.title : ''}</h2>
            <strong>${data2 ? data2.category : ''}</strong>
            <p>${data2 ? data2.content : ''}</p>
            <div class="buttons">
                <a href="#" class="btn delete" @click=${(event) => onDeleteArticle(event, id)}>Delete</a>
                <a href="#" class="btn edit">Edit</a>
                <a href="#" class="btn edit">Back</a>
            </div>
        </div>
    </div>
`};