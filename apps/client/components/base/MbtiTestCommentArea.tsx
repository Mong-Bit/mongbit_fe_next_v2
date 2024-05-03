import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { FONT, KEY, LOGIN, MESSAGE } from '@/constants/constant';
import { MbtiTestCommentImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { getAllCommentData, submitComment } from '@/services';
import { checkCommentAddValidity, getHeaders } from '@/utils/common';
import { tokenValidate } from '@/utils/logIn';
import { sortCommentByDate } from '@/utils/mbtiTest';

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
  const [comment, setComment] = useState({
    submitClicked: false,
    data: sortCommentByDate(mbtiTestCommentData),
  });
  const [userInfo, setUserInfo] = useRecoilState(atomlogInState);

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClickCommentSubmitButton = async () => {
    const isTokenValid = tokenValidate(userInfo);
    const prevCommentAddedDate = userInfo[LOGIN.LAST_COMMENT_TIME] ? new Date(userInfo[LOGIN.LAST_COMMENT_TIME]) : null;
    const canAddComment = checkCommentAddValidity(new Date(), prevCommentAddedDate);

    if (!isTokenValid) return router.push('/login');
    if (value === '') return;
    if (!canAddComment) return alert(MESSAGE.COMMENT_TIME);

    const headers = getHeaders(true);
    const body = {
      memberId: userInfo[LOGIN.USER_MEMBER_ID],
      testId: testId,
      content: value,
    };

    await submitComment(headers, body);
    await getAllCommentData(testId).then((response) => {
      setComment((prev) => ({
        ...prev,
        submitClicked: !comment.submitClicked,
        data: response ? sortCommentByDate(response.dataList) : [],
      }));
      setUserInfo((prev: Model.LogInState) => ({ ...prev, [LOGIN.LAST_COMMENT_TIME]: new Date() }));
      setValue('');
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY.ENTER && !event.nativeEvent.isComposing) handleClickCommentSubmitButton();
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

      <CommentBody commentData={comment.data} userInfo={userInfo} />
    </Wrap_mediaquery>
  );
}
