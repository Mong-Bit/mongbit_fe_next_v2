import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { FONT, KEY, LOGIN } from '@/constants/constant';
import { MbtiTestCommentImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { getAllCommentData, submitComment } from '@/services';
import { doSetActionWithNewValue, getHeaders } from '@/utils/common';
import { sortCommentByDate, validationBeforeWriteComment } from '@/utils/mbtiTest';

import CommentBody from '@/components/base/CommentBody';
import {
  CommentHeaderText,
  CommentHeaderWrap,
  CommentTextBox,
  CommentTextBoxWrap,
} from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

export default function MbtiTestCommentArea({
  testId,
  commentCount,
  mbtiTestCommentData,
}: Base.MbtiTestCommentAreaProp) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [comment, setComment] = useState(sortCommentByDate(mbtiTestCommentData));
  const [userInfo, setUserInfo] = useRecoilState(atomlogInState);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY.ENTER && !event.nativeEvent.isComposing) handleClickCommentSubmitButton();
  };
  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const handleClickCommentSubmitButton = async () => {
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
    await getAllCommentData(testId).then((response) => {
      doSetActionWithNewValue(comment, setComment, null, sortCommentByDate(response?.dataList));
      setUserInfo((prev: Model.LogInState) => ({ ...prev, [LOGIN.LAST_COMMENT_TIME]: new Date() }));
      setValue('');
    });
  };

  return (
    <Wrap_mediaquery alignItems="center" flexDirection="column">
      <CommentHeaderWrap>
        <div>
          <Image src={MbtiTestCommentImage.src} width="1rem" />
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
        <button onClick={handleClickCommentSubmitButton} />
      </CommentTextBoxWrap>

      <CommentBody testId={testId} commentData={comment} userInfo={userInfo} setComment={setComment} />
    </Wrap_mediaquery>
  );
}
