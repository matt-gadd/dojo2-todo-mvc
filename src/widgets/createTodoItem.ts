import createWidget, { Widget } from 'dojo-widgets/createWidget';
import createButton, { Button } from 'dojo-widgets/createButton';
import createTextInput, { TextInput } from 'dojo-widgets/createTextInput';
import createCheckboxInput, { CheckboxInput } from './createCheckboxInput';
import { h, VNode } from 'maquette/maquette';

import { destroyTodoAction, toggleCompleteTodoAction } from '../actions/todoActions';

export interface TodoItemMixin {
	childWidgets: TodoItemChildWidgets;
}

interface TodoItemChildWidgets {
	checkbox: CheckboxInput;
	button: Button;
	editInput: TextInput;
}

interface TodoItemCheckedEvent extends Event {
	target: any;
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
			checkboxChangeListener(e: TodoItemCheckedEvent) {
				const todoItem: TodoItem = this;

				toggleCompleteTodoAction.do({
					id: todoItem.state.id,
					complete: e.target.checked
				});
			},
			deleteButtonClickListener(e: MouseEvent) {
				const todoItem: TodoItem = this;

				destroyTodoAction.do({
					id: todoItem.state.id
				}).then(() => {
					todoItem.invalidate();
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

				const checkboxVNode = checkbox.render();
				checkboxVNode.properties.checked = todoItem.state.completed;

				return [
					h('div', {'class': 'view'}, [
						checkboxVNode,
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
