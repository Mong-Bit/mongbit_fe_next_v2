import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { CommentData } from '@/types';
import { formatTimeDifference } from '@/utils/common';

import { COMMENT_MAX_LENGTH, IMAGE_ALT_TEXT } from '@/constants';

interface Props {
  comment: CommentData;
  role?: string;
  loginUserId?: string;
  handleUpdateComment: (comment: CommentData, content: string) => void;
  onClickDeleteButton: (id: string, memberId: string) => void;
}

const CommentButton = styled.button`
  width: 25px;
  background-color: transparent;
  font-size: ${(props) => props.theme.font.size.s};
  color: ${(props) => props.theme.colors.deepGray};
`;

const EditInput = styled.input`
  width: 85%;
  border: none;
  outline: none;
`;

const CommentItem = ({ comment, role, loginUserId, handleUpdateComment, onClickDeleteButton }: Props) => {
  const { thumbnailImage, username, commentDate, content, memberId, id } = comment;
  const [value, setValue] = useState('');
  const [isModifying, setIsModifying] = useState(false);

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const onClickEditButton = () => setIsModifying(!isModifying);

  const onClickSaveButton = () => {
    handleUpdateComment(comment, value);
    setIsModifying(!isModifying);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) onClickSaveButton();
  };

  return (
    <B.Wrap_mediaquery padding="0.5rem 1.5rem" gap="0.8rem">
      <Image
        src={thumbnailImage}
        alt={IMAGE_ALT_TEXT + '회원 이미지'}
        width={40}
        height={40}
        style={{ borderRadius: '1rem' }}
      />
      <L.Flex width="100%" gap="0.5rem" $flexDirection="column" $alignItems="baseline">
        <L.Flex width="100%" $justifyContent="space-between">
          <B.Text>{`${username} · ${formatTimeDifference(commentDate)}`}</B.Text>
          <L.Flex gap="0.3rem">
            {loginUserId === memberId && (
              <CommentButton onClick={isModifying ? () => onClickSaveButton() : onClickEditButton}>
                {isModifying ? '저장' : '수정'}
              </CommentButton>
            )}
            {(loginUserId === memberId || role === 'ROLE_ADMIN') && (
              <CommentButton onClick={isModifying ? onClickEditButton : () => onClickDeleteButton(id, memberId)}>
                {isModifying ? '취소' : '삭제'}
              </CommentButton>
            )}
          </L.Flex>
        </L.Flex>
        {isModifying ? (
          <L.Flex width="100%" $flexDirection="column">
            <L.Flex width="100%" gap="0.5rem">
              <EditInput
                defaultValue={content}
                type="Text"
                maxLength={COMMENT_MAX_LENGTH}
                onChange={onChangeInputValue}
                onKeyDown={onKeyDown}
              />
              <B.Text fontSize={theme.font.size.xs}>
                {value.length} / {COMMENT_MAX_LENGTH}
              </B.Text>
            </L.Flex>
            <B.DividingLine margin="0" />
          </L.Flex>
        ) : (
          <B.Text color={theme.colors.black}>{content}</B.Text>
        )}
      </L.Flex>
    </B.Wrap_mediaquery>
  );
};
export default CommentItem;
