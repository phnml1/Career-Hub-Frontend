'use client';

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useSearchParamsBasedRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * 쿼리 파라미터를 업데이트하고 페이지를 이동합니다.
   * value가 null, undefined, 빈 문자열인 경우 해당 키를 삭제합니다.
   */
  const updateRoute = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      // 쿼리가 바뀌어도 스크롤이 위로 튀지 않도록 { scroll: false } 설정
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const toggleSearchParam = useCallback(
    (key: string, value: string) => {
      const currentValues =
        searchParams.get(key)?.split(',').filter(Boolean) || [];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      updateRoute({ [key]: nextValues.join(',') });
    },
    [searchParams, updateRoute],
  );

  /**
   * 모든 쿼리 파라미터를 제거하고 초기 상태로 되돌립니다.
   */
  const clearRoute = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    searchParams,
    updateRoute,
    clearRoute,
    toggleSearchParam,
    /**
     * 단일 파라미터 가져오기
     */
    getSearchParam: (key: string, defaultValue: string = '') =>
      searchParams.get(key) || defaultValue,
    /**
     * 다중 파라미터(배열) 가져오기
     * ?processTypes=DOCUMENT,INTERVIEW -> ['DOCUMENT', 'INTERVIEW']
     */
    getSearchParams: useCallback(
      (key: string) => {
        const values = searchParams.get(key);
        return values ? values.split(',').filter(Boolean) : [];
      },
      [searchParams],
    ),
  };
}
