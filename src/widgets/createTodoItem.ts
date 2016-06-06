import createWidget from 'dojo-widgets/createWidget';

const createTodoItem = createWidget
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
