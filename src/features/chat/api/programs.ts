import type { Program } from '../types';

const programs: Program[] = [
  {
    id: 'nutrition',
    label: 'بهبود وضعیت تغذیه',
    description: 'محتوای برنامه بهبود وضعیت تغذیه',
  },
  {
    id: 'diet',
    label: 'رژیم درمانی',
    description: 'محتوای برنامه رژیم درمانی',
  },
];

export async function fetchPrograms(): Promise<Program[]> {
  return programs;
}
