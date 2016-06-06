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
		{'id': 'add-todo', 'label': 'Add Todo'},
		{'id': 'todo-header', 'title': 'todos', 'placeholder': 'What needs to be done?'}
	]
});

const widgets: Child[] = [];

const main = createPanel({
	id: 'todo-app',
	stateFrom: widgetStore,
	tagName: "section"
});

// The Header
const todoHeader = createTodoHeader({
	id: 'todo-header',
	stateFrom: widgetStore
});

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

const todoButton = createButton({
	id: 'add-todo',
	stateFrom: widgetStore
});

todoButton.on('click', function () {
	todoActions.create('blah').do();
});

main.append(todoHeader);
main.append(todoButton);
widgets.push(main);

projector.append(widgets);
projector.attach();
