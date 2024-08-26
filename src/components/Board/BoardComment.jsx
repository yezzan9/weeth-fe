import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { UserContext } from '../../hooks/UserContext';
import { ReactComponent as CommentButton } from '../../assets/images/ic_comment.svg';
import { ReactComponent as ReplyButton } from '../../assets/images/ic_reply.svg';
import { ReactComponent as CommentDeleteButton } from '../../assets/images/ic_comment_delete.svg';
import theme from '../../styles/theme';

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BoardCommented = styled.div`
  padding: 0;
  border-radius: 10px;
`;

const UserName = styled.div`
  width: 100%;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
  line-height: 16.71px;
`;

const StyledComment = styled.div`
  width: 100%;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
`;

const CommentDate = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
  font-size: 12px;
  line-height: 14.32px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

const ReplyRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
`;

const BoardReply = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  color: ${theme.color.grayScale.white};
  padding: 0 0 0 10px;
  border-radius: 10px;
  width: calc(100% - 30px);
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const CommentButtonMargin = styled.div`
  margin-right: 5px;
`;

const BoardComment = ({
  postId,
  noticeId,
  commentId,
  name,
  content,
  time,
  recomments = [],
  onDelete,
  onReply,
  isDeleted,
  setComments,
  isWriter,
}) => {
  const [showReplies, setShowReplies] = useState(recomments.length > 0);
  const inputRef = useRef(null); // ref 생성

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { userData } = useContext(UserContext);

  useEffect(() => {
    // 댓글이 삭제된 경우 대댓글 작성 기능을 비활성화
    if (isDeleted) {
      setShowReplies(false); // 대댓글 입력창을 숨기거나 비활성화
    }
  }, [isDeleted]);

  const handleReplyClick = () => {
    if (isDeleted || content === '삭제된 댓글입니다.') {
      alert('삭제된 댓글에는 대댓글을 달 수 없습니다.');
      return;
    }
    if (window.confirm('대댓글을 입력하시겠습니까?')) {
      onReply(commentId); // 대댓글 입력창을 여는 콜백 함수 호출
      setShowReplies(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus(); // 입력창에 포커스를 주어 키보드가 자동으로 올라오게 함
        }
      }, 0);
    }
  };

  const handleDeleteRecomment = async (recommentId) => {
    const recomment = recomments.find((r) => r.id === recommentId); // 삭제할 대댓글을 찾음
    const isRecommentWriter = recomment.name === userData.name; // 대댓글 작성자인지 확인
    if (window.confirm('정말 이 대댓글을 삭제하시겠습니까?')) {
      if (!isRecommentWriter) {
        alert('대댓글을 삭제할 권한이 없습니다.');
        return;
      }
      try {
        let url;
        if (postId) {
          url = `${BASE_URL}/api/v1/posts/${postId}/comments/${recommentId}`;
        } else if (noticeId) {
          url = `${BASE_URL}/api/v1/notices/${noticeId}/comments/${recommentId}`;
        } else {
          console.error('Neither postId nor noticeId is provided.');
          return;
        }

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          console.log('DELETE request successful:', response.data);
          // 서버 응답이 성공적일 경우 상태 업데이트
          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  children: comment.children.filter(
                    (child) => child.id !== recommentId,
                  ),
                };
              }
              return comment;
            }),
          );
        } else {
          console.error('DELETE request failed:', response.data);
          alert('대댓글 삭제에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('대댓글 삭제 중 오류 발생:', error);
        alert('대댓글 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <CommentContainer>
      <BoardCommented>
        <BottomRow>
          <UserName>{name}</UserName>
          <CommentButton alt="" onClick={handleReplyClick} />
          <CommentButtonMargin />
          {isWriter && ( // 작성자인 경우에만 삭제 버튼을 보여줌
            <CommentDeleteButton onClick={onDelete} />
          )}
        </BottomRow>
        <StyledComment>{content}</StyledComment>
        <CommentDate>{formatDateTime(time) || '00/00 00:00'}</CommentDate>

        {showReplies && recomments.length > 0 && !isDeleted && (
          <div>
            {recomments.map((recomment) => {
              const isRecommentWriter = recomment.name === userData.name; // 대댓글 작성자인지 확인
              return (
                <ReplyRow key={recomment.id}>
                  <ReplyButton
                    alt=""
                    style={{
                      marginRight: '2px',
                      flexShrink: 0,
                    }}
                  />
                  <BoardReply>
                    <BottomRow>
                      <UserName>{recomment.name}</UserName>
                      {isRecommentWriter && ( // 대댓글 작성자인 경우에만 삭제 버튼을 보여줌
                        <CommentDeleteButton
                          alt=""
                          style={{
                            marginRight: '10px',
                          }}
                          onClick={() => handleDeleteRecomment(recomment.id)} // 이벤트 핸들러 수정
                        />
                      )}
                    </BottomRow>
                    <StyledComment>{recomment.content}</StyledComment>
                    <CommentDate>{formatDateTime(recomment.time)}</CommentDate>
                  </BoardReply>
                </ReplyRow>
              );
            })}
          </div>
        )}
      </BoardCommented>
    </CommentContainer>
  );
};

BoardComment.propTypes = {
  postId: PropTypes.number.isRequired,
  noticeId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  recomments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      isDeleted: PropTypes.bool,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  isDeleted: PropTypes.bool,
  setComments: PropTypes.func.isRequired,
  isWriter: PropTypes.bool.isRequired,
};

BoardComment.defaultProps = {
  recomments: [], // Default to an empty array if no recomments are provided
  isDeleted: false,
};

export default BoardComment;
