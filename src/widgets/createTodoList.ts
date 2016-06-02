import { h, VNode } from 'maquette/maquette';
import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import { ComposeFactory } from 'dojo-compose/compose';
import createStateful, { Stateful, StatefulOptions, State } from 'dojo-compose/mixins/createStateful';
import createTodoItem from './createTodoItem';

export interface ListStateItem {
	[property: string]: any;
	id: string;
	label: string;
}

export interface TodoListState<I extends ListStateItem> extends State {
	/**
	 * Any items that are to be rendered by the list
	 */
	items?: I[];
}

export interface List {
	/**
	 * Return an array of VNodes/strings the represent the rendered results of the list of this instance
	 */
	getChildrenNodes(): (VNode | string)[];
}

/**
 * A mixin that provides the functionality to render a list of items that are in its state
 */
export type TodoList = List & Stateful<TodoListState<ListStateItem>> && Widget<TodoListState<I>>;

export interface TodoListFactory extends ComposeFactory<TodoList, StatefulOptions<TodoListState<ListStateItem>>> {
	<I extends ListStateItem>(options?: StatefulOptions<TodoListState<I>>): List;
}

export interface TodoListState<I extends ListStateItem> extends WidgetState, ListMixinState<I> { }

const createTodoList: TodoListFactory = createStateful
	.mixin({
		mixin: <List> {
			getChildrenNodes(): (VNode | string)[] {
				const list: TodoList = this;
				if (list.state && list.state.items) {
					const items = list.state.items;
                    
                    return [ h('ul', items
						.map(item => createTodoItem({
							id: item.id,
							stateFrom: createMemoryStore(item),
							tagName: 'li'
						}))
						.map(todoItem => todoItem.render()))];
				}
				return [];
			}
		}
	});

export default createTodoList;
