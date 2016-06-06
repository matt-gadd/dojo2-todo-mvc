import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import createButton from 'dojo-widgets/createButton';
import createPanel from 'dojo-widgets/createPanel';
import projector from 'dojo-widgets/projector';
import { Child } from 'dojo-widgets/mixins/createParentMixin';

import todoRegistryFactory from './registry/createTodoRegistry';
import todoActionsFactory from './actions/createTodoActions';
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
		{'id': 'todo-header', 'title': 'todos', 'placeholder': 'What needs to be done?'}
	]
});

const widgets: Child[] = [];

const todoApp = createPanel({
	id: 'todo-app',
	stateFrom: widgetStore,
	tagName: 'section'
});

// The Header
const todoHeader = createTodoHeader({
	id: 'todo-header',
	stateFrom: widgetStore
});

todoApp.append(todoHeader);

// The List
const todoRegistry = todoRegistryFactory({ widgetStore });

const todoActions = todoActionsFactory({
	widgetStore,
	'todoListId': 'todo-list'
});

const todoList = createTodoList({
	id: 'todo-list',
	stateFrom: widgetStore,
	widgetRegistry: todoRegistry
});

todoApp.append(todoList);

// Create button
const todoButton = createButton({
	id: 'todo-add',
	stateFrom: widgetStore
});

todoApp.append(todoButton);

// Push to widgets array
widgets.push(todoApp);

todoButton.on('click', function () {
	todoActions.create('blah').do();
});

projector.append(widgets);
projector.attach();
