import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import Providers from '@/shared/components/providers';

export const metadata: Metadata = {
  title: 'Career-Hub',
  description:
    '구직자의 지원 현황·자소서·면접 일정을 한 곳에서 관리하는 통합 플랫폼 SaaS 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='scroll-smooth' suppressHydrationWarning>
      <body className='antialiased min-h-screen overflow-y-auto overflow-x-hidden'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
