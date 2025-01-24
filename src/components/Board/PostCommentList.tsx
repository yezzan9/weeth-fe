import styled from 'styled-components';
import Comment from '@/components/Board/Comment';
import ReplyComment from '@/components/Board/ReplyComment';

interface CommentType {
  id: number;
  name: string;
  content: string;
  time: string;
  position: string;
  role: string;
  children?: CommentType[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 23px 0 23px;
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostCommentList = ({
  comments,
  path,
  postId,
  onCommentDelete,
  onReply,
}: {
  comments: CommentType[];
  path: string;
  postId: number;
  onCommentDelete: () => void;
  onReply: (commentId: number) => void;
}) => {
  const renderComments = (commentList: CommentType[]) => {
    return commentList.map((comment) => (
      <div key={comment.id}>
        <Comment
          name={comment.name}
          content={comment.content}
          time={comment.time}
          postId={postId}
          commentId={comment.id}
          path={path}
          position={comment.position}
          role={comment.role}
          onDelete={onCommentDelete}
          onReply={() => onReply(comment.id)}
        />

        {comment.children && comment.children.length > 0 && (
          <ReplyWrapper>
            {comment.children.map((child) => (
              <ReplyComment
                key={child.id}
                postId={postId}
                commentId={child.id}
                name={child.name}
                content={child.content}
                position={child.position}
                role={child.role}
                time={child.time}
                path={path}
                onDelete={onCommentDelete}
              />
            ))}
          </ReplyWrapper>
        )}
      </div>
    ));
  };

  return <Container>{renderComments(comments)}</Container>;
};

export default PostCommentList;
