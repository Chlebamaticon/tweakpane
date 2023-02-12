import {ViewProps} from '../../../common/model/view-props';
import {ClassName} from '../../../common/view/class-name';
import {View} from '../../../common/view/view';

interface Config {
	containerElement: HTMLElement;
	viewProps: ViewProps;
}

const cn = ClassName('tbp');

/**
 * @hidden
 */
export class TabPageView implements View {
	public readonly element: HTMLElement;
	public readonly containerElement: HTMLElement;

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(cn());
		config.viewProps.bindClassModifiers(this.element);

		const containerElem = config.containerElement;
		containerElem.classList.add(cn('c'));
		this.element.appendChild(containerElem);
		this.containerElement = containerElem;
	}
}
