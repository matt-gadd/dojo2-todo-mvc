
import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import createPanel from 'dojo-widgets/createPanel';

import todoRegistryFactory from './registry/createTodoRegistry';
import { registerTodoActions } from './actions/todoActions';
import createTodoList from './widgets/createTodoList';
import createTodoHeader from './widgets/createTodoHeader';

import createApp from 'dojo-app/createApp';

const app = createApp({ toAbsMid: require.toAbsMid });

const widgetStore = createMemoryStore({
	data: [
		{'id': 'todo-app', 'classes': ['todoapp']},
		{'id': 'todo-list', 'classes': ['todo-list'], children: []},
		{'id': 'todo-add', 'label': 'Add Todo'},
		{'id': 'todo-header', 'classes': ['header'], 'title': 'todos', 'placeholder': 'What needs to be done?', 'value': ''}
	]
});

app.registerStore('widget-store', widgetStore);

app.loadDefinition({
	widgets: [
		{
			id: 'todo-app',
			factory: createPanel,
			stateFrom: 'widget-store',
			options: {
				tagName: 'section'
			}
		},
		{
			id: 'todo-header',
			factory: createTodoHeader,
			stateFrom: 'widget-store'
		},
		{
			id: 'todo-list',
			factory: createTodoList,
			stateFrom: 'widget-store',
			options: {
				widgetRegistry: todoRegistryFactory({ widgetStore })
			}
		}
	]
});

const parentId = 'todo-list';
registerTodoActions({ widgetStore, parentId });

app.realize(document.body);

