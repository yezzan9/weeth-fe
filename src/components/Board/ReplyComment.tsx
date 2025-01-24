import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import setPositionIcon from '@/hooks/setPositionIcon';

interface ReplyCommentProps {
  name: string;
  content: string;
  time: string;
  commentId: number;
  postId: number;
  path: string;
  position: string;
  role: string;
  onDelete: () => void;
}

const ReplyComment = ({
  name,
  content,
  time,
  postId,
  commentId,
  path,
  position,
  role,
  onDelete,
}: ReplyCommentProps) => {
  const onClickMenu = () => {
    deleteComment(path, postId, commentId);
    onDelete();
  };
  const formattedTime = formatDateTime(time);
  const isMyComment = name === useGetUserName();

  return (
    <S.ReplyCommentContainer>
      <S.ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
      <S.ReplyContentContainer>
        <S.NameText>
          <S.PositionIcon
            src={setPositionIcon(role, position)}
            alt="포지션 아이콘"
          />
          {name}
        </S.NameText>
        <S.ContentText>{content}</S.ContentText>
        <S.DateText>{formattedTime}</S.DateText>
        {isMyComment && (
          <S.ReplyImageButton onClick={onClickMenu}>
            <img src={MenuImage} alt="메뉴 버튼" />
          </S.ReplyImageButton>
        )}
      </S.ReplyContentContainer>
    </S.ReplyCommentContainer>
  );
};

export default ReplyComment;
