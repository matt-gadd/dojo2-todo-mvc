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
	create(label:string):any {
		const widgetStore = this.widgetStore;
		const todoListId = this.todoListId;
		return createAction({
			do() {
				const id = 'id' + Date.now();
				return widgetStore.get(todoListId).then((todoListData:any) => {
					var todoItems = todoListData.children;
					todoItems.push(id);
					return widgetStore.add({id: id, label}).then(() =>
						widgetStore.patch({ id: todoListId, 'children': todoItems }));
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



