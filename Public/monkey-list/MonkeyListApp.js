import Component from '../Component.js';
import Header from '../common/Header.js';
import MonkeyList from './MonkeyList.js';
import Loading from '../common/Loading.js';
import { getMonkeys } from '../services/monkey-api.js';

class MonkeyListApp extends Component {

    async onRender(element) {
        const header = new Header({ title: 'List of Monkeys' });
        element.prepend(header.renderDOM());
        
        const loading = new Loading({ loading: true });
        element.appendChild(loading.renderDOM());

        const main = element.querySelector('main');
        const list = new MonkeyList({ monkeys: [] });
        main.appendChild(list.renderDOM());

        try {
            const monkeys = await getMonkeys();
            console.log(monkeys, 'listApp');
            list.update({ monkeys: monkeys });
        }
        catch (err) {
            console.log('Load monkeys failed\n', err);
        }
        finally {
            
            setTimeout(() => {
                loading.update({ loading: false });
            }, 500);
        }
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