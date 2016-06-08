import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import createButton from 'dojo-widgets/createButton';
import createPanel from 'dojo-widgets/createPanel';
import projector from 'dojo-widgets/projector';
import { Child } from 'dojo-widgets/mixins/createParentMixin';

import todoRegistryFactory from './registry/createTodoRegistry';
import { createTodoAction, destroyTodoAction, registerTodoActions } from './actions/todoActions';
import createTodoList from './widgets/createTodoList';
import createTodoHeader from './widgets/createTodoHeader';

interface NewTodoEvent extends Event {
	value: string;
}

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
		{'id': 'todo-header', 'classes': ['header'], 'title': 'todos', 'placeholder': 'What needs to be done?', 'inputValue': ''}
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

// Create button
const todoButton = createButton({
	id: 'todo-add',
	stateFrom: widgetStore
});

const parentId = 'todo-list';
registerTodoActions({ widgetStore, parentId });

let count = 0;

function deleteInAWhile (id: string) {
	setTimeout(() => {
		destroyTodoAction.do({ id, parentId: 'todo-list' });
	}, 3000);
}

todoButton.on('click', () => {
	createTodoAction.do({ 'label': count++, parentId: 'todo-list'}).then(deleteInAWhile);
});

main.append(todoHeader);
main.append(todoList);
widgets.push(main);

projector.append(widgets);
projector.attach();
