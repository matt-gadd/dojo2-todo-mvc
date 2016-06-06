import Promise from 'dojo-core/Promise';
import { Child } from 'dojo-widgets/mixins/createParentMixin';
import createTodoItem from '../widgets/createTodoItem';
import compose from 'dojo-compose/compose';
import { MemoryStore } from 'dojo-widgets/util/createMemoryStore';
import createAction, { Action, ActionState } from 'dojo-actions/createAction';

interface TodoRegistryOptions {
	widgetStore: MemoryStore<Object>
}

const createTodoActions = compose({
	create(label:string):ActionState {
		const widgetStore = this.widgetStore;
		const todoListId = this.todoListId;
		return createAction({
			do() {
				const id = 'todo-' + Date.now();
				return widgetStore.get(todoListId).then((todoListData:any) => {
					const children = todoListData.children;
					children.push(id);
					return widgetStore.add({
						id, label
					}).then(() => widgetStore.patch({
						id: todoListId, 'children': children
					}));
				});
			}
		});
	}
}, function (createTodoAction:any, options:any) {
	if (options) {
		for (let key in options) {
			createTodoAction[key] = options[key]
		}
	}
});

export default createTodoActions;



