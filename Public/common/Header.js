import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'Monkeys';

        return /*html*/`
            <header class="header">
                
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./monkey-detail.html">Monkeys</a>
                    <a href="./monkey-form.html">Add a Monkey</a>
                </nav>
            </header>
        `;
    }
}

export default Header;