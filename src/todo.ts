
import { ComposeFactory } from 'dojo-compose/compose';
import createMemoryStore from 'dojo-widgets/util/createMemoryStore';
import createButton from 'dojo-widgets/createButton';
import createDijit from 'dojo-widgets/createDijit';
import createLayoutContainer from 'dojo-widgets/createLayoutContainer';
import createList from 'dojo-widgets/createList';
import createPanel from 'dojo-widgets/createPanel';
import createResizePanel from 'dojo-widgets/createResizePanel';
import createTabbedPanel from 'dojo-widgets/createTabbedPanel';
import createTextInput from 'dojo-widgets/createTextInput';


import createTodoList from './widgets/createTodoList';

import createWidget, { Widget, WidgetOptions } from 'dojo-widgets/createWidget';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinState, FormFieldMixinOptions } from 'dojo-widgets/mixins/createFormFieldMixin';
import projector from 'dojo-widgets/projector';
import { Child } from 'dojo-widgets/mixins/createParentMixin';
import { ValueChangeEvent } from 'dojo-widgets/mixins/createFormFieldMixin';
import createAction, { Action, ActionState } from 'dojo-actions/createAction';

interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

interface TextInputOptions extends WidgetOptions<FormFieldMixinState<string>>, FormFieldMixinOptions<string, FormFieldMixinState<string>> { }

type TextInput = Widget<FormFieldMixinState<string>> & FormFieldMixin<string, FormFieldMixinState<string>>;

interface TextInputFactory extends ComposeFactory<TextInput, TextInputOptions> { }

const createCheckboxInput: TextInputFactory = createWidget
	.mixin({
		mixin: createFormFieldMixin,
		initialize(instance) {
			instance.own(instance.on('input', (event: TypedTargetEvent<HTMLInputElement>) => {
				instance.value = event.target.value;
			}));
		}
	})
	.extend({
		type: 'checkbox',
		tagName: 'input'
	});

interface WidgetStateRecord {
	[prop: string]: any;
	id: string;
	classes?: string[];
	label?: string;
	value?: any;
	type?: string;
	closeable?: boolean;
	name?: string;
	items?: any[];
	children?: any[];
}

const filters = [
	{ id: 1, label: 'all', classes: ["selected"]},
	{ id: 2, label: 'active' },
	{ id: 3, label: 'completed' }
];

const widgetStore = createMemoryStore<WidgetStateRecord>({
	data: [
		{"id": "todoapp", "classes": ["todoapp"]},
		{"id": "header", "classes": ["header"]},
		{"id": "header-title", "label": "todos"},
		{"id": "new-todo-form", "classes": ["todo-form"]},
		{"id": "new-todo", "classes": ["new-todo"], "placeholder": "What needs to be done?"},
		{"id": "main", "classes": ["main"]},
		{"id": "toggle-all", "classes": ["toggle-all"]},
		{"id": "todo-list", "classes": ["todo-list"], children: []},
		{"id": "filters-footer", "classes": ["footer"]},
		{"id": "item-counter", "classes": ["todo-count"]},
		{"id": "item-count", "label": "0" },
		{"id": "item-label", "label": "items left"},
		{"id": "filter-list", "classes": ["filters"], items: filters},
		{"id": "add-todo", "label": "Add Todo"},
		{"id": "clear-completed", "classes": ["clear-completed"], "label": "Clear Completed"},
		{"id": "footer", "classes": ["info"]},
		{"id": "footer-p1", "label": "Double-click to edit a todo"},
		{"id": "footer-p2", "label": "Credits: Mr Nobody"},
		{"id": "footer-p3", "label": "Part of TodoMVC"}
	]
});

const actionStore = createMemoryStore({
	data: [
		{ id: 'close-tab', doComplete: true }
	]
});

const widgets: Child[] = [];

const todoApp = createPanel({
	id: 'todoapp',
	stateFrom: widgetStore,
	tagName: "section"
});

const header = createPanel({
	id: 'header',
	stateFrom: widgetStore,
	tagName: "header"
});

todoApp.append(header);

const headerTitle = createWidget({
	id: 'header-title',
	stateFrom: widgetStore,
	tagName: 'h1'
});

const form = createPanel({
	id: 'new-todo-form',
	stateFrom: widgetStore,
	tagName: "form"
});

const newTodo = createTextInput({
	id: 'new-todo',
	stateFrom: widgetStore
});

const main = createPanel({
	id: "main",
	stateFrom: widgetStore,
	tagName: "section"
});

todoApp.append(main);

const toggleAll = createCheckboxInput({
	id: 'toggle-all',
	stateFrom: widgetStore
});

main.append(toggleAll);

//TODO this is shit
const todoList = createTodoList({
	id: 'todo-list',
	stateFrom: widgetStore,
	listeners: {
		error(evt) {
			console.log(evt);
		},
		statechange(evt) {
			console.log(evt);
		},
		childlist(evt) {
			console.log(evt);
		}
	}
});

main.append(todoList);


const filtersFooter = createPanel({
	id: "filters-footer",
	stateFrom: widgetStore,
	tagName: "footer"
});

todoApp.append(filtersFooter);

const itemCounter = createPanel({
	id: "item-counter",
	stateFrom: widgetStore,
	tagName: "span"
});

filtersFooter.append(itemCounter);

const itemCount = createWidget({
	id: "item-count",
	stateFrom: widgetStore,
	tagName: "strong"
});

itemCounter.append(itemCount);

const itemLabel = createWidget({
	id: "item-label",
	stateFrom: widgetStore,
	tagName: "span"
});

itemCounter.append(itemLabel);

//TODO this is shit
const filterList = createTodoList({
	id: 'filter-list',
	stateFrom: widgetStore
});

filtersFooter.append(filterList);

const clearCompleted = createButton({
	id: 'clear-completed',
	stateFrom: widgetStore
});

filtersFooter.append(clearCompleted);

const footer = createPanel({
	id: 'footer',
	stateFrom: widgetStore,
	tagName: "footer"
});

const p1 = createWidget({
	id: 'footer-p1',
	stateFrom: widgetStore,
	tagName: 'p'
});

const p2 = createWidget({
	id: 'footer-p2',
	stateFrom: widgetStore,
	tagName: 'p'
});

const p3 = createWidget({
	id: 'footer-p3',
	stateFrom: widgetStore,
	tagName: 'p'
});

const todoButton = createButton({
	id: 'add-todo',
	stateFrom: widgetStore
});

widgets.push(todoButton);

// const widgetRegistry = {
// 	get(id: string | symbol): Promise<Child> {
// 		let widget: Child;
// 		switch (id) {
// 		case 'panel-1':
// 			widget = panel1;
// 			break;
// 		case 'panel-2':
// 			widget = panel2;
// 			break;
// 		case 'panel-3':
// 			widget = panel3;
// 			break;
// 		case 'panel-4':
// 			widget = panel4;
// 			break;
// 		}
// 		return Promise.resolve(widget);
// 	},
// 	identify(value: Child): string | symbol {
// 		let id: string | symbol;
// 		switch (value) {
// 		case panel1:
// 			id = 'panel-1';
// 			break;
// 		case panel2:
// 			id = 'panel-2';
// 			break;
// 		case panel3:
// 			id = 'panel-3';
// 			break;
// 		case panel4:
// 			id = 'panel-4';
// 			break;
// 		}
// 		return id;
// 	}
// };

const addTodo = createAction({
	do() {
		const label = newTodo.value;
		
		const li = createWidget({
			id: "id1",
			stateFrom: widgetStore,
			tagName: 'li'
		});
		
		//todoList.append(li);
		
		return widgetStore.patch({ "children": [{"id": "id1"}]}, {id: 'todo-list'});
	}
});

todoButton.on('click', addTodo);

window.widgetStore = widgetStore;


header.append(headerTitle);
header.append(form);
form.append(newTodo);

footer.append(p1);
footer.append(p2);
footer.append(p3);

widgets.push(todoApp);
widgets.push(footer);

projector.append(widgets);
projector.attach();