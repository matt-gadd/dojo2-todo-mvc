import { h } from 'maquette/maquette';
import createWidget from 'dojo-widgets/createWidget';
import createStateful from 'dojo-compose/mixins/createStateful';

const createTodoItem = createWidget
	.extend({
		tagName: 'li'
	});

export default createTodoItem;
