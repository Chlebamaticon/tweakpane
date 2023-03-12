import * as assert from 'assert';
import {describe} from 'mocha';

import {ValueMap} from '../../../common/model/value-map';
import {createValue} from '../../../common/model/values';
import {ViewProps} from '../../../common/model/view-props';
import {NumberTextView} from '../../../common/number/view/number-text';
import {createTestWindow} from '../../../misc/dom-test-util';
import {Tuple3} from '../../../misc/type-util';
import {ColorTextsMode, ColorTextsView} from './color-texts';

function createTextViews(
	doc: Document,
	viewProps: ViewProps,
): Tuple3<NumberTextView> {
	return [0, 1, 2].map(
		() =>
			new NumberTextView(doc, {
				dragging: createValue<number | null>(0),
				props: ValueMap.fromObject({
					formatter: (v) => String(v),
					keyScale: 1,
					pointerScale: 1,
				}),
				value: createValue<number>(0),
				viewProps: viewProps,
			}),
	) as Tuple3<NumberTextView>;
}

describe(ColorTextsView.name, () => {
	it('should bind disabled', () => {
		const doc = createTestWindow().document;
		const viewProps = ViewProps.create();
		const v = new ColorTextsView(doc, {
			mode: createValue<ColorTextsMode>('rgb'),
			inputViews: createTextViews(doc, viewProps),
			viewProps: viewProps,
		});
		assert.strictEqual(v.modeSelectElement.disabled, false);

		viewProps.set('disabled', true);
		assert.strictEqual(v.modeSelectElement.disabled, true);
	});
});
