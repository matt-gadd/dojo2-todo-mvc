import createWidget from 'dojo-widgets/createWidget';
import createParentMixin from 'dojo-widgets/mixins/createParentListMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';

const createTodoList = createWidget
	.mixin(createParentMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.extend({
		tagName: 'ul'
	});

export default createTodoList;
