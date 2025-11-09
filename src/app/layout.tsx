import RootLayout from '@/layouts/root-layout/root-layout';
import { PropsWithChildren } from '@/types/children';
import './globals.css';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <RootLayout>{children}</RootLayout>;
};

export default Layout;