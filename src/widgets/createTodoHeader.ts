import createWidget, { Widget} from 'dojo-widgets/createWidget';
import createTextInput, { TextInput } from 'dojo-widgets/createTextInput';
import { h, VNode } from 'maquette/maquette';

export interface TodoHeaderMixin {
	childWidgets: TodoHeaderChildWidgets;
}

interface TodoHeaderChildWidgets {
	textInput: TextInput;
}

export type TodoHeader = Widget<any> & TodoHeaderMixin;

const ENTER_KEY_CODE = 13;

const createTodoHeader = createWidget
	.mixin({
		initialize(instance) {
			instance.childWidgets = {
				textInput: createTextInput({
					listeners: { 'keypress': instance.inputKeypressListener.bind(instance) },
					state: {
						'classes': [ 'new-todo' ]
					}
				})
			};
		},
		mixin: {
			childWidgets: <TodoHeaderChildWidgets> null,
			inputKeypressListener(e: KeyboardEvent) {
				const todoHeader: TodoHeader = this;
				const textInput = todoHeader.childWidgets.textInput;

				if (e.keyCode === ENTER_KEY_CODE) {
					todoHeader.emit({
						type: 'new-todo',
						value: textInput.value
					});
				}
			},
			render(): VNode {
				const todoHeader: TodoHeader = this;
				const textInput = todoHeader.childWidgets.textInput;

				const inputVNode = textInput.render();
				inputVNode.properties.placeholder = todoHeader.state.placeholder;
				inputVNode.properties['autofocus'] = true;

				return h('header', {'class': todoHeader.state.classes.join(' ')}, [
					h('h1', todoHeader.state.title),
					inputVNode
				]);
			}
		}
	});

export default createTodoHeader;
