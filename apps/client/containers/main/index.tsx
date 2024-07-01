'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PATHS } from '@/constants/paths';
import * as B from '@/styles/base.style';

import { MbtiTestItem } from '@/components/MbtiTestItem';

export default function Main({ data }) {
  const router = useRouter();
  return (
    <B.Wrap_mediaquery $flexDirection="column">
      <B.Title>
        <h3>👀 랜덤 심리테스트</h3>
        <p>고민할 틈은 안 줄 테니 일단 플레이하고 생각하기</p>
      </B.Title>

      <B.Button onClick={() => router.push(PATHS.RANDOM)} margin="1.5rem 0 2rem 0">
        {'아무거나 시작 >'}
      </B.Button>

      {/* 기본 심테 */}
      <B.Title>
        <h3>🌟 심테의 근본, MBTI 검사</h3>
      </B.Title>

      <Link href={`/mbti-test/649a7bccaa04db61384808c5/preview`}>
        <MbtiTestItem
          imageUrl="https://i.ibb.co/GJ08BC3/quick-mbti-cover.png"
          squareText="신속하고 아마도 정확한 퀵 MBTI!"
        />
      </Link>

      {/* 최신 심테 */}
      <B.Title>
        <h3>💙 최신 심테</h3>
      </B.Title>
      <MbtiTestItem mbtiTestData={data?.testCoverDTOList} />
    </B.Wrap_mediaquery>
  );
}
