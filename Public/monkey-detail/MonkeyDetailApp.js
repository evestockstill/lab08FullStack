import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import MonkeyDetail from './MonkeyDetail.js';
import { getMonkeys } from '../services/monkey-api.js';

class MonkeyDetailApp extends Component {

    async onRender(element) {
        const header = new Header();
        element.prepend(header.renderDOM());

        const main = element.querySelector('main');

        const loading = new Loading({ loading: true });
        main.appendChild(loading.renderDOM());

        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');

       
        if (!id) {
            window.location = 'monkey-list.html';
            return;
        }

        try {
            const monkey = await getMonkeys(id);
            const monkeyDetail = new MonkeyDetail({ monkey });
            main.appendChild(monkeyDetail.renderDOM());
        }
        catch (err) {
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                <div class="details"> 
                </div>
            </div>
        `;
    }
}

export default MonkeyDetailApp;