import { useRouter } from 'next/navigation';

import { PATHS } from '@/constants/paths';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';

type PageType = 'NonLogin' | 'NoResultData';

interface NonMyPageProps {
  pageType: PageType;
}

const NonMyPage = ({ pageType }: NonMyPageProps) => {
  const router = useRouter();

  if (pageType === 'NonLogin') {
    return (
      <B.Wrap_mediaquery height="600px" $flexDirection="column" $justifyContent="space-evenly">
        <B.Title $textAlign="center">
          <h3>로그인이 되어 있지 않아요 🥲</h3>
          <p>로그인 하고 나의 결과 기록 확인하기</p>
        </B.Title>
        <B.Button onClick={() => router.push(PATHS.LOGIN)}>로그인 하러 가기</B.Button>
      </B.Wrap_mediaquery>
    );
  }

  return (
    <B.Wrap_mediaquery height="350px" $flexDirection="column" $justifyContent="space-around">
      <B.Title $textAlign="center">
        <h3>테스트 결과가 없어요! 🥹</h3>
        <p>테스트 즐기고 결과 확인하기 👾</p>
      </B.Title>
      <L.Flex height="200px" $flexDirection="column" $justifyContent="space-between">
        <B.Button width="150px" onClick={() => router.push(PATHS.TOTAL)}>
          전체 목록
        </B.Button>
        <B.Button width="150px" onClick={() => router.push(PATHS.LATEST)}>
          최신 목록
        </B.Button>
        <B.Button width="150px" onClick={() => router.push(PATHS.RANDOM)}>
          랜덤 테스트
        </B.Button>
      </L.Flex>
    </B.Wrap_mediaquery>
  );
};

export default NonMyPage;
