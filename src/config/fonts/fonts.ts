import localFont from 'next/font/local';

export const iranSansX = localFont({
  src: [
    {
      path: './iran-sans/IRANSansX-UltraLight.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: './iran-sans/IRANSansX-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './iran-sans/IRANSansX-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './iran-sans/IRANSansX-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './iran-sans/IRANSansX-DemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './iran-sans/IRANSansX-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iran-sans-x',
  display: 'swap',
});