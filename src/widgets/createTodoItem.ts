import createWidget from 'dojo-widgets/createWidget';
import createButton from 'dojo-widgets/createButton';
import createTextInput from 'dojo-widgets/createTextInput';
import createCheckbox from './createCheckbox';
import { h, VNode } from 'maquette/maquette';

const createTodoItem = createWidget
	.mixin({
		mixin: {
			getChildrenNodes(): VNode[] {
				const checkbox = createCheckbox();
				checkbox.setState({
					'classes': ['toggle']
				});

				const button = createButton();
				button.setState({
					'classes': ['destroy']
				});

				const editInput = createTextInput();
				editInput.setState({
					'classes': ['edit'],
					'value': 'createTextInput'
				});

				return [
					h('div', {'class': 'view'}, [
						checkbox.render(),
						h('label', this.state.label),
						button.render()
					]),
					editInput.render()
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;

// <li class="completed">
// 	<div class="view">
// 		<input class="toggle" type="checkbox" checked>
// 		<label>Taste JavaScript</label>
// 		<button class="destroy"></button>
// 	</div>
// 	<input class="edit" value="Create a TodoMVC template">
// </li>
