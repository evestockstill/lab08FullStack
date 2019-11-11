import Component from '../Component.js';

class MonkeyDetail extends Component {
    renderHTML() {
        const monkey = this.props.monkey;
        const json = JSON.stringify(monkey, true, 4);
        return /*html*/`
            <pre>${json}</pre>
        `;
    }
}

export default MonkeyDetail;