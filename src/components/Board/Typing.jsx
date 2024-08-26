import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ReactComponent as RegisterComment } from '../../assets/images/ic_send.svg';
import { replaceNewLines } from '../../hooks/Utils';
import theme from '../../styles/theme';

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 370px;
  margin: 10px 5% 10px 5%;
`;

const InputField = styled.input`
  width: 100%;
  height: 37px;
  color: ${theme.color.grayScale.white};
  background-color: ${theme.color.main.mainColor};
  border: none;
  border-radius: 15px;
  font-size: 16px; // 확대 방지를 위해 16px로 설정
  font-family: ${theme.font.family.pretendard_semiBold};
  outline: none;
  padding: 0 10% 0 5%;

  &::placeholder {
    color: ${theme.color.grayScale.white};
  }
`;

const Typing = ({
  noticeId,
  postId,
  onCommentSubmitted,
  parentCommentId = null,
  onInputFocus,
}) => {
  const [comment, setComment] = useState('');
  // const location = useLocation();
  // const { parentCommentId = null } = location.state || {};

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegisterComment = async () => {
    const trimmedComment = comment.trim();
    if (trimmedComment === '') {
      console.error('댓글 내용을 입력해주세요.');
      return;
    }

    // Use replaceNewLines function from Utils to process the comment
    const processedComment = replaceNewLines(trimmedComment);

    console.log('댓글 작성 시도:', {
      noticeId,
      postId,
      processedComment,
      parentCommentId,
    });

    try {
      let url;
      if (noticeId) {
        url = `${BASE_URL}/api/v1/notices/${noticeId}/comments`; // 공지사항 댓글 경로
        console.log('Notice 댓글 작성 URL:', url);
      } else if (postId) {
        url = `${BASE_URL}/api/v1/posts/${postId}/comments`; // 일반 게시물 댓글 경로
      } else {
        console.error('Neither postId nor noticeId is provided.');
        return;
      }

      const response = await axios.post(
        url,
        {
          content: processedComment,
          parentCommentId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.code === 200) {
        console.log('댓글이 성공적으로 등록되었습니다.');
        setComment(''); // 입력 필드 초기화
        console.log('onCommentSubmitted 호출 전:', response.data.data);
        onCommentSubmitted(response.data.data); // 새로운 댓글 데이터를 부모 컴포넌트로 전달
        if (parentCommentId) {
          console.log('대댓글이 등록되었습니다:', response.data.data);
        } else {
          console.log('일반 댓글이 등록되었습니다:', response.data.data);
        }
      } else {
        console.error('응답에서 오류 발생:', response.data.message);
      }
    } catch (error) {
      console.error('댓글을 게시하는 데 실패했습니다:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegisterComment();
    }
  };

  return (
    <InputWrapper>
      <InputField
        type="text"
        value={comment}
        placeholder="댓글을 입력하세요."
        onChange={handleCommentChange}
        onFocus={onInputFocus} // 입력창이 포커스될 때 대댓글 상태 초기화
        onKeyPress={handleKeyPress}
      />
      <RegisterComment
        alt=""
        onClick={handleRegisterComment}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
    </InputWrapper>
  );
};

Typing.propTypes = {
  noticeId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  onCommentSubmitted: PropTypes.func.isRequired,
  parentCommentId: PropTypes.number,
  onInputFocus: PropTypes.func.isRequired,
};

Typing.defaultProps = {
  parentCommentId: null, // 기본값을 null로 설정
};

export default Typing;
