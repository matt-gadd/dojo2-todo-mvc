import createWidget from 'dojo-widgets/createWidget';
import { h, VNode } from 'maquette/maquette';

const createTodoItem = createWidget
	.mixin({
		initialize(instance) {
		},
		mixin: {
			getChildrenNodes(): VNode[] {
				return [
					h('div', {'class': 'view'}, [
						h('label', this.state.label)
					])
				];
			}
		}
	})
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
