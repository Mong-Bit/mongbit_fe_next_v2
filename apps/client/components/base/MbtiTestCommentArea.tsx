import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { FONT, IMAGE_ALT_STRING, KEY, LOGIN } from '@/constants/constant';
import { MbtiTestCommentImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { getMbtiTestCommentData, submitComment } from '@/services';
import { doSetStateWithNewState, getHeaders } from '@/utils/common';
import { sortCommentByDate, validationBeforeWriteComment } from '@/utils/mbtiTest';

import { SeeMoreButton } from '../ui/Button';
import CommentBody from '@/components/base/CommentBody';
import {
  CommentHeaderText,
  CommentHeaderWrap,
  CommentTextBox,
  CommentTextBoxWrap,
  SeeMoreCommentWrap,
} from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

export default function MbtiTestCommentArea({
  testId,
  commentCount,
  commentPageSet,
  mbtiTestCommentData,
  hasNextPageComment,
  setAction,
}: Base.MbtiTestCommentAreaProp) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [comment, setComment] = useState(sortCommentByDate(mbtiTestCommentData));
  const [hasNextPage, setHasNextPage] = useState(hasNextPageComment);
  const [userInfo, setUserInfo] = useRecoilState(atomlogInState);

  useEffect(() => {
    setComment(sortCommentByDate(mbtiTestCommentData));
  }, [mbtiTestCommentData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY.ENTER && !event.nativeEvent.isComposing) handleClickCommentSubmit();
  };
  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const handleClickCommentSubmit = async () => {
    if (value === '') return;

    const valiateState = validationBeforeWriteComment(userInfo, router);
    if (!valiateState) return;

    const headers = getHeaders(true);
    const body = {
      memberId: userInfo[LOGIN.USER_MEMBER_ID],
      testId: testId,
      content: value,
    };

    await submitComment(headers, body);
    setAction(`add ${new Date().toString()}`);

    setUserInfo((prev: Model.LogInState) => ({ ...prev, [LOGIN.LAST_COMMENT_TIME]: new Date() }));
    setValue('');
  };

  const handleClickSeeMoreComment = () => {
    getMbtiTestCommentData(testId, commentPageSet.commentPage).then((response) => {
      const newArr = [...comment, response?.dataList.commentDTOList].flat();

      doSetStateWithNewState(null, setComment, null, newArr);
      setHasNextPage(response?.dataList.hasNextPage);
    });

    commentPageSet.setCommentPage(commentPageSet.commentPage + 1);
  };

  return (
    <Wrap_mediaquery alignItems="center" flexDirection="column">
      <CommentHeaderWrap>
        <div>
          <Image src={MbtiTestCommentImage.src} width="1rem" alt={IMAGE_ALT_STRING + '코멘트 아이콘'} />
          <CommentHeaderText>댓글</CommentHeaderText>
          <CommentHeaderText color={FONT.COLOR.DEEPGRAY}>{commentCount}</CommentHeaderText>
        </div>
        <div>
          <p>{value.length}/</p>
          <p>100</p>
        </div>
      </CommentHeaderWrap>

      <CommentTextBoxWrap>
        <CommentTextBox
          placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
          onKeyDown={handleKeyDown}
          onChange={(event) => handleChangeInputValue(event)}
          value={value}
          maxLength={100}
          borderBottom={value.length >= 100 ? '2px solid red' : ''}
        />
        <button onClick={handleClickCommentSubmit} />
      </CommentTextBoxWrap>

      <CommentBody testId={testId} commentData={comment} userInfo={userInfo} setAction={setAction} />

      {hasNextPage && (
        <SeeMoreCommentWrap>
          <SeeMoreButton onClick={handleClickSeeMoreComment} />
        </SeeMoreCommentWrap>
      )}
    </Wrap_mediaquery>
  );
}
