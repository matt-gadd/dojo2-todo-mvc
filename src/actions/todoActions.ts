import createAction, { AnyAction } from 'dojo-actions/createAction';

interface TodoActionConfiguration {
	widgetStore: any;
	parentId: string;
}

interface WidgetStateRecord {
	[prop: string]: any;
	id: string;
	classes?: string[];
	label?: string;
	children?: string[];
}

function configure (configuration: TodoActionConfiguration) {
	this.configuration = configuration;
};

function generateId (): string {
	return `todo-${Date.now()}`;
}

const create: AnyAction = createAction({
	configure,
	do(options: any) {
		const id = generateId();
		const widgetStore = this.configuration.widgetStore;
		const parentId = this.configuration.parentId;

		const label = options.label;

		return widgetStore.add({ id, label })
			.then(() => widgetStore.get(parentId))
			.then((todosState: WidgetStateRecord) => [...todosState.children, id])
			.then((children: string[]) => widgetStore.patch({ id: parentId, children }))
			.then(() => id);
	}
});

const destroy: AnyAction = createAction({
	configure,
	do(options: any) {
		const widgetStore = this.configuration.widgetStore;
		const parentId = this.configuration.parentId;

		const childId = options.id;

		return widgetStore.get(parentId)
			.then((todosState: WidgetStateRecord) => todosState.children.filter((id) => id !== childId))
			.then((children: string[]) => widgetStore.patch({ id: parentId, children }))
			.then(() => widgetStore.delete(childId));
	}
});

function registerAll (configuration: TodoActionConfiguration) {
	create.configure(configuration);
	destroy.configure(configuration);
}

export {
	create as createTodoAction,
	destroy as destroyTodoAction,
	registerAll as registerTodoActions
};
