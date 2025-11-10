export function bToA(value: unknown): string {
	try {
		const json = JSON.stringify(value ?? {});
		// Handle Unicode safely
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		return btoa(unescape(encodeURIComponent(json)));
	} catch {
		return '';
	}
}
