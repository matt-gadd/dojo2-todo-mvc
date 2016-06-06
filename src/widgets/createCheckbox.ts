import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetOptions } from 'dojo-widgets/createWidget';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinState, FormFieldMixinOptions } from 'dojo-widgets/mixins/createFormFieldMixin';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export interface CheckboxInputOptions extends WidgetOptions<FormFieldMixinState<string>>, FormFieldMixinOptions<string, FormFieldMixinState<string>> { }

export type CheckboxInput = Widget<FormFieldMixinState<string>> & FormFieldMixin<string, FormFieldMixinState<string>>;

export interface CheckboxInputFactory extends ComposeFactory<CheckboxInput, CheckboxInputOptions> { }

const createCheckbox: CheckboxInputFactory = createWidget
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

export default createCheckbox;
