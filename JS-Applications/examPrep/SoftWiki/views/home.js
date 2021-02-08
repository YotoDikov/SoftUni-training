import { html } from '../node_modules/lit-html/lit-html.js';

import article from './article.js';
import noArticles from './no-articles-yet.js'

export default ({
    data = [],
    navigationHandler,
    showArticles
}) => {
    return html`
        <!--Home -->
        <div class="content">
            <section class="js">
                <h2>JavaScript</h2>
                <div class="articles">
                    ${!data.some(e => e.category === 'C#') 
                        ? html`
                        <h3 class="no-articles">No articles yet</h3>` 
                        :
                        data.filter(x => x.category == 'JS').map(x => { return article({ ...x, navigationHandler }) })}
                </div>
            </section>
        
            <section class="CSharp">
                <h2>C#</h2>
                <div class="articles">
                    ${!data.some(e => e.category === 'C#')
                        ? html`
                    <h3 class="no-articles">No articles yet</h3>`
                    : data.filter(x => x.category == 'C#').map(x => { return article({ ...x, navigationHandler }) })}
                </div>
            </section>
        
            <section class="Java">
                <h2>Java</h2>
                <div class="articles">
                    ${!data.some(e => e.category === 'Java')
                        ? html`
                    <h3 class="no-articles">No articles yet</h3>`
                    : data.filter(x => x.category === 'Java').map(x => { return article({ ...x, navigationHandler }) })}
                </div>
            </section>
        
            <section class="Pyton">
                <h2>Pyton</h2>
                <div class="articles">
                    ${!data.some(e => e.category === 'Pyton')
                        ? html`
                    <h3 class="no-articles">No articles yet</h3>`
                    : data.filter(x => x.category == 'Pyton').map(x => { return article({ ...x, navigationHandler }) })}
                </div>
            </section>
        </div>
`
};


{/* <section class="js">
<h2>JavaScript</h2>
<div class="articles">
    <article>
        <h3>Arrays</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi magnam aliquid
            quamest fugit ipsa quidem
            impedit praesentium tempore placeat numquam blanditiis fuga soluta beatae perspiciatis voluptas
            atque obcaecati?</p>
        <a href="#" class="btn details-btn">Details</a>
    </article>
    <article>
        <h3>Objects</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi magnam aliquid
            quamest fugit ipsa quidem
            impedit praesentium tempore placeat numquam blanditiis fuga soluta beatae perspiciatis voluptas
            atque obcaecati?</p>
        <a href="#" class="btn details-btn">Details</a>
    </article>
</div>
</section>
<section class="CSharp">
<h2>C#</h2>
<div class="articles">
    <article>
        <h3>Dictionary</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi magnam aliquid
            quamest fugit ipsa quidem
            impedit praesentium tempore placeat numquam blanditiis fuga soluta beatae perspiciatis voluptas
            atque obcaecati?</p>
        <a href="#" class="btn details-btn">Details</a>
    </article>
</div>
</section>
<section class="Java">
<h2>Java</h2>
<div class="articles">
    <article>
        <h3>JDK</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi magnam aliquid
            quamest fugit ipsa quidem impedit praesentium tempore placeat numquam blanditiis fuga soluta
            beatae perspiciatis voluptas atque obcaecati?</p>
        <a href="#" class="btn details-btn">Details</a>
    </article>
</div>
</section>
<section class="Pyton">
<h2>Pyton</h2>
<div class="articles">
    <article>
        <h3>Gjango</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi magnam aliquid
            quamest fugit ipsa quidem
            impedit praesentium tempore placeat numquam blanditiis fuga soluta beatae perspiciatis voluptas
            atque obcaecati?</p>
        <a href="#" class="btn details-btn">Details</a>
    </article>
</div>
</section> */}