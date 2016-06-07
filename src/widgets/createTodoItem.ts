import createWidget, { Widget } from 'dojo-widgets/createWidget';
import createButton, { Button } from 'dojo-widgets/createButton';
import createTextInput, { TextInput } from 'dojo-widgets/createTextInput';
import createCheckboxInput, { CheckboxInput } from './createCheckboxInput';
import { h, VNode } from 'maquette/maquette';

export interface TodoItemMixin {
	childWidgets: TodoItemChildWidgets;
}

interface TodoItemChildWidgets {
	checkbox: CheckboxInput;
	button: Button;
	editInput: TextInput;
}

export type TodoItem = Widget<any> & TodoItemMixin;

const createTodoItem = createWidget
	.mixin({
		initialize(instance) {
			instance.childWidgets = {
				checkbox: createCheckboxInput(),
				button: createButton(),
				editInput: createTextInput()
			};

			instance.childWidgets.checkbox.on('change', () => {
				debugger;
			});
		},
		mixin: {
			childWidgets: <TodoItemChildWidgets> null,
			getChildrenNodes(): VNode[] {
				const todoItem: TodoItem = this;

				todoItem.childWidgets.checkbox.setState({
					'classes': ['toggle']
				});

				todoItem.childWidgets.button.setState({
					'classes': ['destroy']
				});

				todoItem.childWidgets.editInput.setState({
					'classes': ['edit'],
					'value': 'createTextInput'
				});

				return [
					h('div', {'class': 'view'}, [
						todoItem.childWidgets.checkbox.render(),
						h('label', todoItem.state.label),
						todoItem.childWidgets.button.render()
					]),
					todoItem.childWidgets.editInput.render()
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
