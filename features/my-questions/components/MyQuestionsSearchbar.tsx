'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyQuestionsSearchbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryFromUrl = searchParams.get('query') || '';
  const currentType = searchParams.get('type') || 'linked';
  const isLinked = currentType === 'linked';

  const [searchInputValue, setSearchInputValue] = useState(queryFromUrl);

  useEffect(() => {
    setSearchInputValue(queryFromUrl);
  }, [queryFromUrl]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchInputValue.trim()) {
      params.set('query', searchInputValue.trim());
    } else {
      params.delete('query'); // 빈 값일 경우 쿼리 파라미터 삭제
    }

    // scroll: false로 검색 시 화면 튀기 방지
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const placeholder = isLinked
    ? '연동된 회사명, 질문 내용을 검색해 보세요'
    : '일반 질문 내용을 검색해 보세요';

  return (
    <InputGroup className='h-12 bg-white mb-6'>
      <InputGroupAddon>
        <SearchIcon className='stroke-3' />
      </InputGroupAddon>
      <InputGroupInput
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton onClick={handleSearch}>검색하기</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
