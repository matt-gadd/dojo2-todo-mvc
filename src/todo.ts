
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
import WeakMap from 'dojo-core/WeakMap';
import Map from 'dojo-core/Map';
import createTodoItem from './widgets/createTodoItem';
import Promise from 'dojo-core/Promise';

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
	children?: string[];
}

const todoItems : string[] = [];

const widgetStore = createMemoryStore<WidgetStateRecord>({
	data: [
		{"id": "todoapp", "classes": ["todoapp"]},
		{"id": "todo-list", "classes": ["todo-list"], children: todoItems},
		{"id": "add-todo", "label": "Add Todo"}
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

const idToWidgetMap = new Map<string, Child>();
const widgetToIdMap = new WeakMap<Child, string>();

const widgetRegistry = {
    get(id: string ): Promise<Child> {
        let widget :Child = idToWidgetMap.get(id);
				if (!widget) {
						widget = createTodoItem({id: id, stateFrom: widgetStore});
						widgetToIdMap.set(widget, id);
						idToWidgetMap.set(id, widget);
				}
				return Promise.resolve(widget);
    },
    identify(value: Child): string {
        return widgetToIdMap.get(value);
    }
};

//TODO this is shit
const todoList = createTodoList({
	id: 'todo-list',
	stateFrom: widgetStore,
	widgetRegistry: widgetRegistry,
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

todoApp.append(todoList);

const todoButton = createButton({
	id: 'add-todo',
	stateFrom: widgetStore
});

widgets.push(todoButton);

const addTodo = createAction({
	do() {
		const id = "id" + Date.now();

		todoItems.push(id);

		return widgetStore.add({id: id, label: "fuck it"}).then(() =>
				widgetStore.patch({ id: 'todo-list', "children": todoItems }));
	}
});

todoButton.on('click', addTodo);

widgets.push(todoApp);

projector.append(widgets);
projector.attach();
