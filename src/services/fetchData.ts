import { request } from './request';

export default async function fetchData(
	jobId: string | number,
	keys: Array<string>,
	setValue: (key: string, value: unknown) => void,
) {
	const response = await request<{ data: Record<string, unknown> }>({ jobId });
	const data = response?.data ?? {};
	keys.forEach((key) => setValue(key, data[key]));
}
