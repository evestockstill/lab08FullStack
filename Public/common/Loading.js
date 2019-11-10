import Component from '../Component.js';

class Loading extends Component {
    renderHTML() {
        const loading = this.props.loading;
        if (!loading) {
            return /*html*/`<div></div>`;
        }

        return /*html*/`
            <div class="loading-container">
                <img src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif">
            </div>
        `;
    }
}

export default Loading;