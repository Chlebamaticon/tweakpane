import * as assert from 'assert';
import {describe, it} from 'mocha';

import {BindingTarget} from '../../common/binding/target';
import {BindingValue} from '../../common/binding/value/value';
import {findConstraint} from '../../common/constraint/composite';
import {Constraint} from '../../common/constraint/constraint';
import {StepConstraint} from '../../common/constraint/step';
import {ComplexValue} from '../../common/model/complex-value';
import {getBoundValue} from '../../common/model/test-util';
import {NumberTextController} from '../../common/number/controller/number-text';
import {createTestWindow} from '../../misc/dom-test-util';
import {createInputBindingController} from '../plugin';
import {NumberInputPlugin} from './plugin';

describe(NumberInputPlugin.id, () => {
	it('should return appropriate step constraint', () => {
		const doc = createTestWindow().document;
		const c = createInputBindingController(NumberInputPlugin, {
			document: doc,
			params: {
				min: 1,
				step: 2,
			},
			target: new BindingTarget({foo: 1}, 'foo'),
		});

		const v = getBoundValue(
			c?.value as BindingValue<number>,
		) as ComplexValue<number>;
		const constraint = findConstraint(
			v.constraint as Constraint<number>,
			StepConstraint,
		);
		assert.strictEqual(constraint?.step, 2);
		assert.strictEqual(constraint?.origin, 1);
	});

	it('should use specified formatter', () => {
		const doc = createTestWindow().document;
		const c = createInputBindingController(NumberInputPlugin, {
			document: doc,
			params: {
				format: (v: number) => `foo ${v} bar`,
			},
			target: new BindingTarget({foo: 123}, 'foo'),
		});

		const vc = c?.valueController as NumberTextController;
		if (!(vc instanceof NumberTextController)) {
			assert.fail('unexpected controller');
		}

		assert.strictEqual(vc.view.inputElement.value, 'foo 123 bar');
	});
});
