// import createWidget from 'dojo-widgets/createWidget';
// import createParentMixin from 'dojo-widgets/mixins/createParentMixin';
// import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
// // import createStateful from 'dojo-compose/mixins/createStateful';
// import createTodoItem from './createTodoItem';

// const createTodoList = createWidget
// 	.mixin(createParentMixin
// 		.mixin({
// 			mixin: {
// 				getChildrenNodes(): any {
// 					const list = this;
// 					if (list.state && list.state.items) {
// 						const items = list.state.items;
// 						return items.map((item: any) => createTodoItem().render());
// 					}
// 					return [];
// 				}
// 			}
// 		})
// 	)
// 	.extend({
// 		tagName: 'ul'
// 	});

// export default createTodoList;


import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createParentMixin, { ParentMixin, ParentMixinOptions, Child } from 'dojo-widgets/mixins/createParentMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';

const createTodoList: any = createWidget
	.mixin(createParentMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.extend({
		setChildren: gun
		tagName: 'ul'
	});

export default createTodoList;
