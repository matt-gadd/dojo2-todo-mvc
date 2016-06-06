import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import createButton from 'dojo-widgets/createButton';
import createPanel from 'dojo-widgets/createPanel';
import Promise from 'dojo-core/Promise';
import projector from 'dojo-widgets/projector';
import { Child } from 'dojo-widgets/mixins/createParentMixin';

import todoRegistryFactory from './registry/createTodoRegistry';
import todoActionsFactory from './actions/createTodoActions';
import createTodoList from './widgets/createTodoList';

interface WidgetStateRecord {
	[prop: string]: any;
	id: string;
	classes?: string[];
	label?: string;
	children?: string[];
}

const widgetStore = createMemoryStore<WidgetStateRecord>({
	data: [
		{'id': 'todoapp', 'classes': ['todoapp']},
		{'id': 'todo-list', 'classes': ['todo-list'], children: []},
		{'id': 'add-todo', 'label': 'Add Todo'}
	]
});

const todoRegistry = todoRegistryFactory({
	'widgetStore': widgetStore
});

const todoActions = todoActionsFactory({
	'widgetStore': widgetStore,
	'todoListId': 'todo-list'
});

const widgets: Child[] = [];

const todoApp = createPanel({
	id: 'todoapp',
	stateFrom: widgetStore,
	tagName: 'section'
});

const todoList = createTodoList({
	id: 'todo-list',
	stateFrom: widgetStore,
	widgetRegistry: todoRegistry
});

todoApp.append(todoList);

const todoButton = createButton({
	id: 'add-todo',
	stateFrom: widgetStore
});

widgets.push(todoButton);

todoButton.on('click', function () {
	todoActions.create('blah').do();
});

widgets.push(todoApp);

projector.append(widgets);
projector.attach();
