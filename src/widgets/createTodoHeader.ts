import createWidget from 'dojo-widgets/createWidget';
import { h, VNode } from 'maquette/maquette';

const createTodoHeader = createWidget
	.mixin({
		mixin: {
			render(): VNode[] {
				return [ h('h1', this.state.title), h('input', {
					'class': 'new-todo',
					'placeHolder': this.state.placeholder,
					'autofocus': 'autofocus'
				})];
			}
		}
	})
	.extend({
		tagName: 'header'
	});

export default createTodoHeader;
