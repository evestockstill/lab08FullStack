import MonkeyItem from '../monkey-list/MonkeyItem.js'

const test = QUnit.test;
QUnit.module('Render Monkey Item');

test('renders html from data', assert => {
    // arrange
    const monkey = {
        name: 'Emporer Tamarin Monkey',
        image: './Public/assets/emporer.jpg',
        old_world: false,
        new_world: true,
        weight: '1 pound',
        type: 'Callitrichidae',
        summary: 'Gregarious and playful in the wild. Communication is a key behavior, coordinating grouos of Emperor Monkeys. Distinctive long mustache. Lives mostly in the Amazonian lowlands and Lowermountain Rainforest. Consumes mostly fruits, veggies and flowers.'
    };

    const expected = /*html*/`
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

    // act
    const props = { monkey: monkey };
    const monkeyItem = new MonkeyItem(props);
    const html = monkeyItem.renderHTML();

    // assert
    assert.htmlEqual(html, expected);
});
