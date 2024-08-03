import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import BoardComment from '../components/Board/BoardComment';
import Typing from '../components/Board/Typing';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import theme from '../styles/theme';
import { BoardContext } from '../hooks/BoardContext';
import BoardAPI from '../hooks/BoardAPI';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  min-height: 810px;
  color: ${theme.color.grayScale.white};
  margin-bottom: 50px;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 370px;
  background-color: ${theme.color.grayScale.gray12};
  top: 0;
  z-index: 1;
`;

const StudyRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
  margin-top: 90px;
  flex-grow: 1;
`;

const TextContainer = styled.div`
  margin: 0 0 7%; 10px;
  padding: 0;
`;

const StudyNamed = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const SubRow = styled.div`
  display: flex;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const ComponentRow = styled.div`
  display: flex;
  margin-top: 10px;
  margin: 40px 4% 0 0;
`;

const UserName = styled.div`
  padding: 0;
  margin-right: 3%;
`;

const StyledDate = styled.div`
  padding: 0;
`;

const StudyContents = styled.div`
  width: 88%;
  margin-top: 20px;
  margin-right: 4%;
  font-family: ${theme.font.family.pretendard_regular};
  weight: 400;
  font-size: 16px;
  line-height: 19.09px;
`;

const RightMargin = styled.div`
  margin-right: 27%;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid ${theme.color.grayScale.gray30};
  padding-bottom: 10px;
`;

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month}/${day} ${hours}:${minutes}`;
};

const BoardDetail = () => {
  const { state } = useLocation();
  const { id, noticeId } = useParams();
  const postId = parseInt(id, 10);

  const { boardData, error } = useContext(BoardContext);
  const [content, setContent] = useState(null);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.code === 200) {
        setContent(response.data.data);
        setTotalCommentCount(response.data.data.totalComments);
      } else {
        console.error('Error fetching post data:', response.data.message);
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  if (state?.data) {
    setContent(state.data);
    setTotalCommentCount(state.data.totalComments || 0);
  } else if (boardData) {
    const currentData = boardData.find(post => post.id === parseInt(postId));
    if (currentData) {
      setContent(currentData);
      setTotalCommentCount(currentData.totalComments || 0);
    } else {
      fetchData();
    }
  } else {
    fetchData();
  }
}, [state, boardData, postId, accessToken, BASE_URL]);

const handleFileChange = (newFile) => {
  // 파일 URL을 content 상태에 반영
  setContent((prevContent) => {
    const { fileUrls = [] } = prevContent;
    return {
      ...prevContent,
      fileUrls: [...fileUrls, newFile],
    };
  });
};

const handleCommentSubmitted = async (newComment) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/comments`, 
      { comment: newComment }, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.code === 200) {
      const updatedCount = response.data.data.totalComments;
      console.log('Updated Comment Count:', updatedCount); // 댓글 수 로그 출력
      console.log('Updated Content Data:', response.data.data); // 컨텐츠 데이터 로그 출력
      setTotalCommentCount(updatedCount); // 서버에서 받은 댓글 수 업데이트
      setContent(prevContent => ({
        ...prevContent,
        totalComments: updatedCount,
        comments: [...prevContent.comments, newComment], // 새 댓글 추가
      }));
    } else {
      console.error('Error posting comment:', response.data.message);
    }
  } catch (error) {
    console.error('API request error:', error);
  }
};

const handleModifyClick = async () => {
  try {
    const url = `${BASE_URL}/posts/${postId}`;
    const formData = new FormData();

    const requestPostDTO = {
      title: content.title,
      content: content.data,
    };
    formData.append(
      'requestPostDTO',
      new Blob([JSON.stringify(requestPostDTO)], {
        type: 'application/json',
      }),
    );

    if (content.files && content.files.length > 0) {
      content.files.forEach((file) => {
        formData.append('files', file);
      });
    }

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.code === 200) {
      console.log('modify :', response.data);
      navigate('/BoardPosting');
    } else {
      console.error('수정 실패:', response.data.message);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  } catch (err) {
    console.error('수정 오류:', err);
    alert('수정 도중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

const handleDeleteClick = async () => {
  if (window.confirm('삭제하시겠습니까?')) {
    try {
      const url = `${BASE_URL}/posts/${postId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.code === 200) {
        console.log('삭제가 성공적으로 완료되었습니다.');
        alert('삭제가 완료되었습니다.');
        navigate('/board');
      } else {
        console.error('삭제 실패:', response.data.message);
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
      alert('삭제 도중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }
};

if (error) {
  return <p>Error: {error}</p>;
}

if (!content) {
  return <p>Loading...</p>;
}


  const handleMenuClick = (action) => {
    switch (action) {
      case 'edit':
        handleModifyClick();
        break;
      case 'delete':
        handleDeleteClick();
        break;
      default:
        break;
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <BoardHeader onMenuClick={handleMenuClick} showModal={false} />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          <StudyNamed>{content?.title || 'Loading...'}</StudyNamed>
          <SubRow>
            <UserName>{content?.name || content?.name || 'Unknown'}</UserName>
            <StyledDate>{formatDateTime(content?.time || content?.createAt) || '00/00 00:00'}</StyledDate>
          </SubRow>
          <StudyContents>{content?.content || 'Loading...'}</StudyContents>
        </TextContainer>
        <ComponentRow>
        {content?.fileUrls && content.fileUrls.length > 0 ? (
          content.fileUrls.map((file) => (
            <a key={file.id} href={file.url} target="_blank" rel="noopener noreferrer" />
          ))
        ) : (
          <p>No files attached</p>
        )}
        <AttachButton filetype="file" onFileChange={handleFileChange} />
        <RightMargin />
        </ComponentRow>
        <BottomRow>
          <BoardChat alt="" />
          <CommentCount>{content?.totalComments || 0}</CommentCount>
        </BottomRow>
        {content.comments && content.comments.map(comment => (
          <BoardComment
            key={comment.id}
            name={comment.name || 'Unknown User'}
            content={comment.content}
            time={formatDateTime(comment.time)}
            recomments={comment.recomments || []}
          />
        ))}
      </StudyRow>
      <Typing
        postId={postId}
        onCommentSubmitted={handleCommentSubmitted}
        comment={content.comment || ''}
      />
      <BoardAPI />
    </Container>
  );
};

export default BoardDetail;
