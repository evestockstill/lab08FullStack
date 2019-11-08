import Component from '../Component.js';
import { addMonkey } from '../services/monkey-api.js';

class MonkeyForm extends Component {

    onRender(form) {
        // event goodness for showing display of range value
        const weightRange = form.querySelector('#weight');
        const weightDisplay = form.querySelector('#weight-display');
        const syncWeight = () => weightDisplay.textContent = weightRange.value;
        weightRange.addEventListener('input', syncWeight);
        syncWeight();

        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);

            const monkey = {
                name: formData.get('name'),
                image: formData.get('image'),
                oldWorld: parseInt(formData.get('old_world')),
                newWorld: parseInt(formData.get('new_world)')),
                weight: parseInt(formData.get('weight')),
                typeID: parseInt(formData.get('type-id')),
                summary: formData.get('summary') === 'on'
            };

            try {
                const saved = await addMonkey(monkey);
                // for now log out our saved cat,
                // eventually use id to redirect to detail page
                console.log(saved);

                window.location = `monkey-list.html`;
            }
            catch (err) {
                console.log('monkey can not saved :(', err);
            }
        });

    }

    renderHTML() {
        const types = this.props.types;
        const monkeyOptionList = types.map(type => {
            return `<option value="${type.id}">${type.name}</option>`;
        });

        const joinedOptionsList = monkeyOptionList.join('');

        console.log(joinedOptionsList);
        return /*html*/`
                <form class="monkey-form">
                    <p>
                        <label for="name">Name</label>
                        <input id="name" name="name" required placeholder="Monkey">
                    </p>
                    <p>
                            <label for="image">Image Url</label>
                            <input id="image" name="image" required placeholder="http://Public/assets/spider-monkey-02.png">
                    </p>
                    <P> 
                    <label for="old_world">Old World</label>
                    <input type="radio" name="old_world" value="old_world">
                        </p>
                    <P> 
                    <label for="new_world">New World</label>
                    <input type="radio" name="new_world" value="new_world">
                        </p>
                        <p>
                        <label for="weight">Weight Range</label>
                            <span class="horizontally-centered">
                                <input id="weight" name="weight" type="range" min="0" max="100" value="lbs">
                            <span id="weight-display">50</span>
                        </span>
                        </p>
                            <p>
                            <label for="type">Monkey Family</label>
                            <select id="type" name="type-id" required>
                                <option disabled selected>&lt;Monkey family&gt;</option>
                                ${joinedOptionsList}
                            </select>
                        </p>
                        <p>
                        <label for="summary">Brief Description</label>
                        <input type="text" id="summary" name="summary">
                                </p>
                        </label>
                                <p>
                                    <button>Add Monkey</button>
                                </p>
                        </form>
    `;
    }
}

export default MonkeyForm;