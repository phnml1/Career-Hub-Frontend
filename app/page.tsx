import CTA from '@/features/landing/CTA';
import Features from '@/features/landing/Features';
import Footer from '@/features/landing/Footer';
import Header from '@/features/landing/Header';
import Hero from '@/features/landing/Hero';
import StepDetails from '@/features/landing/StepDetails';
import AuthInitializer from '@/features/login/components/AuthInitializer';

/**
 * 서비스의 메인 랜딩 페이지이자, 소셜 로그인 성공 시 콜백을 처리하는 진입점입니다.
 *
 * [동작 원리]
 * 1. 백엔드 인증 서버는 로그인이 성공하면 `/?accessToken=...` 형태로 사용자를 리다이렉트시킵니다.
 * 2. Next.js 서버 컴포넌트인 이 페이지에서 `searchParams`를 통해 URL의 토큰을 읽어들입니다.
 * 3. 토큰이 존재할 경우, 클라이언트 컴포넌트인 `AuthInitializer`를 렌더링하여 브라우저의 보안 쿠키 설정을 트리거합니다.
 * 4. 토큰이 없으면 로그인 페이지로 리다이렉트합니다.
 */
export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{
    accessToken?: string;
    refreshToken?: string;
  }>;
}) {
  const { accessToken, refreshToken } = await searchParams;

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    redirect('/login');
  }

  return (
    <div>
      {/* [인증 프로세스 핸들링]
        URL에 토큰이 있다면, AuthInitializer 컴포넌트를 브라우저에 마운트합니다.
        이 컴포넌트는 마운트 직후 '서버 액션'을 호출하여,
        실제 쿠키 저장과 리다이렉트(주소창 정화)가 '서버 사이드'에서 안전하게 처리되도록 유도합니다.
      */}
      {accessToken && (
        <AuthInitializer
          accessToken={accessToken}
          refreshToken={refreshToken}
        />
      )}

      {/* 실제 사용자에게 보여지는 랜딩 페이지 UI 영역 */}
      <Header />

      <main>
        <Hero />
        <Features />
        <StepDetails />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
