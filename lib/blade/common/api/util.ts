import {BindingTarget} from '../../../common/binding/target';
import {TpError} from '../../../common/tp-error';
import {InputBindingPlugin} from '../../../input-binding/plugin';
import {MonitorBindingPlugin} from '../../../monitor-binding/plugin';
import {BladePlugin} from '../../plugin';
import {BaseInputParams, BaseMonitorParams} from './params';
import {Plugins} from './plugins';

export function createBindingTarget(
	obj: unknown,
	key: string,
	opt_id?: string,
): BindingTarget {
	if (!BindingTarget.isBindable(obj)) {
		throw TpError.notBindable();
	}
	return new BindingTarget(obj, key, opt_id);
}

export type PluginRegistration =
	| {
			type: 'blade';
			plugin: BladePlugin<any>;
	  }
	| {
			type: 'input';
			plugin: InputBindingPlugin<any, any, BaseInputParams>;
	  }
	| {
			type: 'monitor';
			plugin: MonitorBindingPlugin<any, BaseMonitorParams>;
	  };

export function registerPlugin(r: PluginRegistration): void {
	if (r.type === 'blade') {
		Plugins.blades.unshift(r.plugin);
	} else if (r.type === 'input') {
		Plugins.inputs.unshift(r.plugin);
	} else if (r.type === 'monitor') {
		Plugins.monitors.unshift(r.plugin);
	}
}
