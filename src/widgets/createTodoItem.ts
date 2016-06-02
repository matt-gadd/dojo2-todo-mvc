import { ComposeFactory } from 'dojo-compose/compose';
import { EventedOptions } from 'dojo-compose/mixins/createEvented';
import { StatefulOptions } from 'dojo-compose/mixins/createStateful';
import createCachedRenderMixin, { CachedRenderMixin, CachedRenderState } from 'dojo-widgets/mixins/createCachedRenderMixin';
import { RenderableOptions } from 'dojo-widgets/mixins/createRenderable';

export interface TodoItemState extends CachedRenderState { }

export interface TodoItemOptions<S extends TodoItemState> extends StatefulOptions<S>, EventedOptions, RenderableOptions { }

export type TodoItem<S extends TodoItemState> = CachedRenderMixin<S>;

export interface TodoItemFactory extends ComposeFactory<TodoItem<TodoItemState>, TodoItemOptions<TodoItemState>> {
	<S extends TodoItemState>(options?: TodoItemOptions<S>): TodoItem<S>;
}

const createTodoItem: TodoItemFactory = createCachedRenderMixin;

export default createTodoItem;