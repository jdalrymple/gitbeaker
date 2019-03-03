import { Constructor, Bundle } from '../../types/types';

export function bundler<T extends { [name: string]: Constructor }, P extends keyof T>(services: T){
	console.log(Object.keys(services).length)

	return (function Bundle(options?: any) {
		Object.entries(services || {}).forEach(([name, ser]) => {
			this[name] = new ser(options);
		});

		console.log(Object.keys(this).length)

	} as any) as Bundle<T, P>;
}

export function skipAllCaps(key, convert, options) {
  return /^[A-Z0-9_]+$/.test(key) ? key : convert(key, options);
}