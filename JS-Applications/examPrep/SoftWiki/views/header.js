import { html } from '../node_modules/lit-html/lit-html.js';



export default ({
    navigationHandler,
    isAuthenticated,
    email,
}) => html`
    <!-- Header -->
    <header @click=${navigationHandler}>
        ${isAuthenticated
                ? html`
                     <h1><a class="home" href="/">SoftWiki</a></h1>
                `
                : html`
                     <h1><a class="home" href="/login">SoftWiki</a></h1>
                `
            }
        <nav class="nav-buttons">
            ${isAuthenticated
                ? html`
                    <a href="/create">Create</a>
                    <a href="/logout">Logout</a>
                `
                : html`
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                `
            }
        </nav>
    </header>
`;
