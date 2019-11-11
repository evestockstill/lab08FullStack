import Component from '../Component.js';

class MonkeyItem extends Component {
    renderHTML() {
        const monkey = this.props.monkey;
        console.log(monkey.name, 'XXX');

        return /*html*/`
            <li class="monkey-item">
                <h2>${monkey.name}</h2>
                <div class="image-container">
                 <img src="${monkey.image}" alt="${monkey.name}">
                </div>
                <div class="info-container">
                <p class="world-class"><span>Old World</span><span>New World</span>
                </P>
                <p class="weight">Full grown approximately ${monkey.weight} lbs</p>
                <p class="type">This monkey is from the ${monkey.type} family</p>
                <p class="summary">${monkey.summary}.</P>
                </div>
            </li>  
        `;
    }
}

export default MonkeyItem;