import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { FONT, KEY, LOGIN } from '@/constants/constant';
import { MbtiTestCommentImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { getAllCommentData, submitComment } from '@/services';
import { formatTimeDifference, getHeaders } from '@/utils/common';
import { tokenValidate } from '@/utils/logIn';
import { sortCommentByDate } from '@/utils/mbtiTest';

import {
  CommentBodyWrap,
  CommentDetailWrap,
  CommentHeaderText,
  CommentHeaderWrap,
  CommentText,
  CommentTextBox,
  CommentTextBoxWrap,
  EachCommentWrap,
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
  const [comment, setComment] = useState({ submitClicked: false, data: sortCommentByDate(mbtiTestCommentData) });
  const userInfo = useRecoilValue(atomlogInState);

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClickCommentSubmitButton = async () => {
    const isTokenValid = tokenValidate(userInfo);
    if (!isTokenValid) router.push('/login');
    if (value === '') return;

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

      <CommentBodyWrap>
        {comment.data?.map((el: Base.MbtiTestCommentData) => (
          <EachCommentWrap key={el.id}>
            <Image src={el.thumbnailImage} width="2.5rem" height="2.5rem" borderRadius="1rem" />
            <CommentDetailWrap>
              <CommentText
                color={FONT.COLOR.DEEPGRAY}
              >{`${el.username} · ${formatTimeDifference(el.commentDate)}`}</CommentText>
              <CommentText padding="0.2rem 4rem 0 0">{el.content}</CommentText>
            </CommentDetailWrap>
          </EachCommentWrap>
        ))}
      </CommentBodyWrap>
    </Wrap_mediaquery>
  );
}
