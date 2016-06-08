import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import createPanel from 'dojo-widgets/createPanel';
import projector from 'dojo-widgets/projector';
import { Child } from 'dojo-widgets/mixins/createParentMixin';

import todoRegistryFactory from './registry/createTodoRegistry';
import { registerTodoActions } from './actions/todoActions';
import createTodoList from './widgets/createTodoList';
import createTodoHeader from './widgets/createTodoHeader';

interface WidgetStateRecord {
	[prop: string]: any;
	id: string;
	classes?: string[];
	label?: string;
	children?: string[];
}

const widgetStore = createMemoryStore<WidgetStateRecord>({
	data: [
		{'id': 'todo-app', 'classes': ['todoapp']},
		{'id': 'todo-list', 'classes': ['todo-list'], children: []},
		{'id': 'todo-add', 'label': 'Add Todo'},
		{'id': 'todo-header', 'classes': ['header'], 'title': 'todos', 'placeholder': 'What needs to be done?', 'value': ''}
	]
});

const widgets: Child[] = [];

const main = createPanel({
	id: 'todo-app',
	stateFrom: widgetStore,
	tagName: 'section'
});

const todoHeader = createTodoHeader({
	id: 'todo-header',
	stateFrom: widgetStore
});

const todoRegistry = todoRegistryFactory({ widgetStore });

const todoList = createTodoList({
	id: 'todo-list',
	stateFrom: widgetStore,
	widgetRegistry: todoRegistry
});

const parentId = 'todo-list';
registerTodoActions({ widgetStore, parentId });

main.append(todoHeader);
main.append(todoList);
widgets.push(main);

projector.append(widgets);
projector.attach();
