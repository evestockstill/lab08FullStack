import Component from '../Component.js';
import Header from '../common/Header.js';
import MonkeyList from './MonkeyList.js';
import { getMonkeys } from '../services/monkey-api.js';

class MonkeyListApp extends Component {

    onRender(element) {
        const header = new Header({ title: 'List of Monkeys' });
        element.prepend(header.renderDOM());

        const list = new MonkeyList({ monkeys: [] });
        const main = element.querySelector('main');
        main.appendChild(list.renderDOM());

        getMonkeys().then(monkeys => {
            list.update({ monkeys });
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main></main>
            </div>
        `;
    }
}

export default MonkeyListApp;