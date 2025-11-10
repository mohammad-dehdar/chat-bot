declare module 'js-cookie' {
	const Cookies: {
		get: (name: string) => string | undefined;
		set: (name: string, value: string, options?: { expires?: number; sameSite?: 'lax' | 'strict' | 'none'; secure?: boolean }) => void;
		remove?: (name: string) => void;
	};
	export default Cookies;
}
