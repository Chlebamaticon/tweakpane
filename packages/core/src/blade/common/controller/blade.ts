import {Controller} from '../../../common/controller/controller';
import {disposeElement} from '../../../common/disposing-util';
import {ViewProps} from '../../../common/model/view-props';
import {ClassName} from '../../../common/view/class-name';
import {View} from '../../../common/view/view';
import {Blade} from '../model/blade';
import {BladePosition, getAllBladePositions} from '../model/blade-positions';
import {Rack} from '../model/rack';

interface Config<V extends View> {
	blade: Blade;
	view: V;
	viewProps: ViewProps;
}

const cn = ClassName('');
const POS_TO_CLASS_NAME_MAP: {[pos in BladePosition]: string} = {
	veryfirst: 'vfst',
	first: 'fst',
	last: 'lst',
	verylast: 'vlst',
};

export class BladeController<V extends View = View> implements Controller<V> {
	public readonly blade: Blade;
	public readonly view: V;
	public readonly viewProps: ViewProps;
	private parent_: Rack | null = null;

	constructor(config: Config<V>) {
		this.blade = config.blade;
		this.view = config.view;
		this.viewProps = config.viewProps;

		const elem = this.view.element;
		this.blade.value('positions').emitter.on('change', () => {
			getAllBladePositions().forEach((pos) => {
				elem.classList.remove(cn(undefined, POS_TO_CLASS_NAME_MAP[pos]));
			});
			this.blade.get('positions').forEach((pos) => {
				elem.classList.add(cn(undefined, POS_TO_CLASS_NAME_MAP[pos]));
			});
		});

		this.viewProps.handleDispose(() => {
			disposeElement(elem);
		});
	}

	get parent(): Rack | null {
		return this.parent_;
	}

	set parent(parent: Rack | null) {
		this.parent_ = parent;
		this.viewProps.set('parent', this.parent_ ? this.parent_.viewProps : null);
	}
}
