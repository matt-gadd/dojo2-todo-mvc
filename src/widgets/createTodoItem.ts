import createWidget, { Widget } from 'dojo-widgets/createWidget';
import createButton, { Button } from 'dojo-widgets/createButton';
import createTextInput, { TextInput } from 'dojo-widgets/createTextInput';
import createCheckboxInput, { CheckboxInput } from './createCheckboxInput';
import { h, VNode } from 'maquette/maquette';

import { destroyTodoAction } from '../actions/todoActions';

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
				checkbox: createCheckboxInput({
					listeners: { 'change': instance.checkboxChangeListener.bind(instance) }
				}),
				button: createButton({
					listeners: { 'click': instance.deleteButtonClickListener.bind(instance) }
				}),
				editInput: createTextInput()
			};
		},
		mixin: {
			checkboxChangeListener(e: Event) {
				// action.complete
			},
			deleteButtonClickListener(e: MouseEvent) {
				const todoItem: TodoItem = this;

				destroyTodoAction.do({
					id: todoItem.state.id
				});
			},
			childWidgets: <TodoItemChildWidgets> null,
			getChildrenNodes(): VNode[] {
				const todoItem: TodoItem = this;
				const checkbox = todoItem.childWidgets.checkbox;
				const button = todoItem.childWidgets.button;
				const editInput = todoItem.childWidgets.editInput;

				checkbox.setState({
					'classes': ['toggle']
				});

				button.setState({
					'classes': ['destroy']
				});

				editInput.setState({
					'classes': ['edit'],
					'value': 'createTextInput'
				});

				return [
					h('div', {'class': 'view'}, [
						checkbox.render(),
						h('label', todoItem.state.label),
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
