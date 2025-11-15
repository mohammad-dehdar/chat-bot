import type { ThemeConfig } from 'antd';

export const AntdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0097a7',
    colorTextBase: '#171717',
    colorBgBase: '#ffffff',
    colorBgContainer: '#f9fafb',
    colorBorder: 'rgba(82, 82, 82, 0.18)',
    colorTextPlaceholder: '#525252',
    borderRadius: 16,
    borderRadiusLG: 24,
    borderRadiusSM: 12,
    fontFamily: 'var(--font-iran-sans-x), Arial, Helvetica, sans-serif',
    controlHeight: 48,
    lineWidth: 1,
    boxShadow: '0px 24px 48px rgba(15, 23, 42, 0.08)',
  },
  components: {
    Button: {
      controlHeight: 44,
      borderRadius: 999,
      fontWeight: 600,
      paddingBlock: 8,
      paddingInline: 16,
    },
    Input: {
      borderRadius: 999,
      controlHeight: 48,
      paddingBlock: 10,
      paddingInline: 16,
      colorBgContainer: 'rgba(255, 255, 255, 0.55)',
    },
    Card: {
      paddingLG: 24,
      borderRadiusLG: 28,
      borderRadiusSM: 18,
      colorBorderSecondary: 'rgba(82, 82, 82, 0.12)',
      colorBgContainer: '#ffffff',
    },
    Tabs: {
      inkBarColor: '#0097a7',
      itemHoverColor: '#0097a7',
      itemSelectedColor: '#0097a7',
      itemActiveColor: '#0097a7',
    },
  },
};
