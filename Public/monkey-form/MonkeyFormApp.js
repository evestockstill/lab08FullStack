import Component from '../Component.js';
import Header from '../common/Header.js';
import MonkeyForm from './MonkeyForm.js';
import { getTypes } from '../services/monkey-api.js';

class MonkeyFormApp extends Component {

    async onRender(element) {
        const header = new Header({ title: 'Add a Monkey' });
        element.prepend(header.renderDOM());

        const main = element.querySelector('main');

        const types = await getTypes();
        const monkeyForm = new MonkeyForm({ types });
        main.appendChild(monkeyForm.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    
                </main>
            </div>
        `;
    }
}

export default MonkeyFormApp;