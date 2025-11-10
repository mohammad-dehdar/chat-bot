// Minimal runtime-compatible shim for js-cookie used until real dep is installed
type SameSite = 'lax' | 'strict' | 'none';

const Cookies = {
	get(name: string): string | undefined {
		if (typeof document === 'undefined') return undefined;
		const match = document.cookie.match(new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)'));
		return match ? decodeURIComponent(match[1]) : undefined;
	},
	set(name: string, value: string, options?: { expires?: number; sameSite?: SameSite; secure?: boolean }) {
		if (typeof document === 'undefined') return;
		let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
		if (options?.expires) {
			const d = new Date();
			d.setTime(d.getTime() + options.expires * 24 * 60 * 60 * 1000);
			cookie += `; Expires=${d.toUTCString()}`;
		}
		cookie += `; Path=/`;
		if (options?.sameSite) cookie += `; SameSite=${options.sameSite}`;
		if (options?.secure) cookie += `; Secure`;
		document.cookie = cookie;
	},
	remove(name: string) {
		if (typeof document === 'undefined') return;
		document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/`;
	},
};

export default Cookies;
