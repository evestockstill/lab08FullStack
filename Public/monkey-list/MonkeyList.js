import Component from '../Component.js';
import MonkeyItem from './MonkeyItem.js';

class MonkeyList extends Component {

    onRender(element) {
        const monkeys = this.props.monkeys;

        monkeys.forEach(monkey => {
            const props = { monkey: monkey };
            const monkeyItem = new MonkeyItem(props);
            const monkeyItemDOM = monkeyItem.renderDOM();
            element.appendChild(monkeyItemDOM);
        });

    }

    renderHTML() {

        return /*html*/`
            <ul class="all-monkeys"></ul>
        `;
    }
}

export default MonkeyList;