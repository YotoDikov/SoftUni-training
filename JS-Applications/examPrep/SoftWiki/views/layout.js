import { html } from '../node_modules/lit-html/lit-html.js';

import header from './header.js';
import footer from './footer.js';


//props са функциите, които ще закачваме за маниполация на темплейтите. navigationHandler е такава функция.
export default (children, props) => html`
${header(props)}

${children(props)}

${footer(props)}
`;