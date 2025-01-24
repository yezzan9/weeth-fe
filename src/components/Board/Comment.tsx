import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import { useState } from 'react';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import setPositionIcon from '@/hooks/setPositionIcon';

interface CommentProps {
  name: string;
  content: string;
  time: string;
  postId: number;
  commentId: number;
  path: string;
  position: string;
  role: string;
  onDelete: () => void;
  onReply: (commentId: number) => void;
}

const Comment = ({
  name,
  content,
  time,
  postId,
  commentId,
  path,
  position,
  role,
  onDelete,
  onReply,
}: CommentProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const onClickReply = () => {
    console.log('답댓', commentId);
    onReply(commentId);
    setIsHighlighted((prev) => !prev);
  };

  const onClickMenu = () => {
    console.log('삭제', commentId);
    deleteComment(path, postId, commentId);
    onDelete();
  };

  const formattedTime = formatDateTime(time);

  const isMyComment = name === useGetUserName();

  return (
    <S.CommentContainer isHighlighted={isHighlighted}>
      <S.CommentContentContainer>
        <S.NameText>
          <S.PositionIcon
            src={setPositionIcon(role, position)}
            alt="포지션 아이콘"
          />
          {name}
        </S.NameText>
        <S.ContentText>{content}</S.ContentText>
        <S.DateText>{formattedTime}</S.DateText>
      </S.CommentContentContainer>
      <S.ButtonContainer>
        <S.ImageButton onClick={onClickReply}>
          <img src={ReplyImage} alt="답댓글 버튼" />
        </S.ImageButton>
        {isMyComment && (
          <S.ImageButton onClick={onClickMenu}>
            <img src={MenuImage} alt="메뉴 버튼" />
          </S.ImageButton>
        )}
      </S.ButtonContainer>
    </S.CommentContainer>
  );
};

export default Comment;
