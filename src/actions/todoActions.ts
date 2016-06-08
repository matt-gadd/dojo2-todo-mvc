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

		return widgetStore.add({ id, label, completed: false, classes: [] })
			.then(() => widgetStore.get(parentId))
			.then((todosState: WidgetStateRecord) => [...todosState.children, id])
			.then((children: string[]) => widgetStore.patch({ id: parentId, children }))
			.then(() => id);
	}
});

interface CompletePatchObject {
	id: string;
	completed: boolean,
	classes?: string[]
}

const todoCompleteClass = 'completed';

function setComplete(todoItemState: any) {
	if (todoItemState.classes.indexOf(todoCompleteClass) < 0) {
		todoItemState.classes.push(todoCompleteClass);
	}
	return todoItemState.classes;
}

function setIncomplete(todoItemState: any) {
	return todoItemState.classes.filter((className: string) => className !== todoCompleteClass);
}

const toggleComplete: AnyAction = createAction({
	configure,
	do(options: any) {
		const widgetStore = this.configuration.widgetStore;
		const itemId = options.id;
		const patchObject: CompletePatchObject = {
			id: itemId,
			completed: options.complete
		};

		return widgetStore.get(itemId)
			.then((todoItemState: any) => options.complete ? setComplete(todoItemState) : setIncomplete(todoItemState))
			.then((classes: string[]) => {
				patchObject.classes = classes;
				return widgetStore.patch(patchObject);
			});
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
	toggleComplete.configure(configuration);
}

export {
	create as createTodoAction,
	toggleComplete as toggleCompleteTodoAction,
	destroy as destroyTodoAction,
	registerAll as registerTodoActions
};
