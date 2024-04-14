import { LOGIN } from '@/constants/constant';
import { fetchClient } from '@/services';

export function getHeaders() {
  if (typeof sessionStorage === 'undefined') return;
  return {
    Authorization: sessionStorage.getItem(LOGIN.TOKEN_NAME),
  };
}

export function goPageWithSelector(selector: Util.LogInState, router: any) {
  const url = selector.goPage?.url;

  if (typeof url !== 'string') return;
  if (url.includes('need_login')) router.back();
  return router.push(url);
}

export function doSeeMoreMbtiTests({ fetchOption, data, page }: Util.doSeeMoreMbtiTestsProp) {
  fetchClient(fetchOption).then((response) => {
    const oldMbtiTestData = data.mbtiTestDataList.testCoverDTOList;
    const newMbtiTestData = [...oldMbtiTestData, response.dataList.testCoverDTOList].flat();

    data.setMbtiTestData((prev) => ({
      ...prev,
      dataList: { hasNextPage: response.dataList.hasNextPage, testCoverDTOList: newMbtiTestData },
    }));
    page.setPage(page.page + 1);
  });
}
