import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import MonkeyForm from './MonkeyForm.js';
import { getTypes } from '../services/monkey-api.js';

class MonkeyFormApp extends Component {

    async onRender(element) {
        const header = new Header({ title: 'Add a Monkey' });
        element.prepend(header.renderDOM());

        const main = element.querySelector('main');
        const loading = new Loading({ loading: true });
        element.appendChild(loading.renderDOM());

        try {
            const types = await getTypes();
            const monkeyForm = new MonkeyForm({ types });
            main.appendChild(monkeyForm.renderDOM());
        }
        catch (err) {
            console.log('Load monkeys failed\n', err);
        }
        finally {
            loading.update({ loading: false });
        }
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