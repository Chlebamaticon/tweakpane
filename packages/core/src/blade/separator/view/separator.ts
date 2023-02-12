import {ViewProps} from '../../../common/model/view-props';
import {ClassName} from '../../../common/view/class-name';
import {View} from '../../../common/view/view';

const cn = ClassName('spr');

interface Config {
	viewProps: ViewProps;
}

/**
 * @hidden
 */
export class SeparatorView implements View {
	public readonly element: HTMLElement;

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(cn());
		config.viewProps.bindClassModifiers(this.element);

		const hrElem = doc.createElement('hr');
		hrElem.classList.add(cn('r'));
		this.element.appendChild(hrElem);
	}
}
