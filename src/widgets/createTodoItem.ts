import createWidget from 'dojo-widgets/createWidget';
import createButton from 'dojo-widgets/createButton';
import createTextInput from 'dojo-widgets/createTextInput';
import createCheckbox from './createCheckbox';
import { h, VNode } from 'maquette/maquette';

const createTodoItem = createWidget
	.mixin({
		initialize(instance) {
			instance.checkbox = createCheckbox();
			instance.button = createButton();
			instance.editInput = createTextInput();

			instance.checkbox.on('change', () => {
				debugger;
			});
		},
		mixin: {
			getChildrenNodes(): VNode[] {
				this.checkbox.setState({
					'classes': ['toggle']
				});

				this.button.setState({
					'classes': ['destroy']
				});

				this.editInput.setState({
					'classes': ['edit'],
					'value': 'createTextInput'
				});

				return [
					h('div', {'class': 'view'}, [
						this.checkbox.render(),
						h('label', this.state.label),
						this.button.render()
					]),
					this.editInput.render()
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
