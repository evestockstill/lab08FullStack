import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(element) {
        const header = new Header();
        element.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
           
                <!-- header goes here -->
                <main>
                    <a href="./monkey-list.html">
                </main>
            </div>
        `;
    }
}

export default App;