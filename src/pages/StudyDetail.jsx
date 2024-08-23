import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UserAPI from '../hooks/UserAPI';
import { UserContext } from '../hooks/UserContext';
import NoticeHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import CommentList from '../components/Board/CommentList';
import EditDelModal from '../components/EditDelModal';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import theme from '../styles/theme';

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
  margin: 0 0 7%;
  padding: 0;
`;

const StudyNamed = styled.div`
  font-size: 24px;
  word-wrap: break-word; /* 단어가 길 경우에도 줄바꿈 허용 */
  overflow-wrap: break-word; /* 긴 단어를 줄바꿈 */
`;

const SubRow = styled.div`
  display: flex;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
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
  font-size: 16px;
  line-height: 19.09px;
  word-wrap: break-word; /* 단어가 길 경우에도 줄바꿈 허용 */
  overflow-wrap: break-word; /* 긴 단어를 줄바꿈 */
`;

const RightMargin = styled.div`
  margin-right: 27%;
`;

const CommentCountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const CommentCount = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const CommentSection = styled.div`
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid ${theme.color.grayScale.gray30};
`;

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month}/${day} ${hours}:${minutes}`;
};

const StudyDetail = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);

  const postId = parseInt(id, 10);

  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // 글 작성자인지 확인하는 로직
  const isWriter = content?.name === userData?.name;

  // 게시글 삭제
  const handleDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const url = `${BASE_URL}/api/v1/posts/${postId}`;
        console.log('Sending DELETE request to:', url);
        console.log('Authorization header:', `Bearer ${accessToken}`);

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // console.log('Response status:', finalResponse.status);
        // console.log('Response data:', finalResponse.data);

        if (response.data.code === 200) {
          alert('삭제가 완료되었습니다.');
          navigate('/board');
        } else if (response.data.code === 400) {
          alert(`삭제 실패: ${response.data.message}`);
        } else {
          console.error('알 수 없는 오류 발생:', response.data.message);
          alert(`삭제에 실패했습니다. 오류 메시지: ${response.data.message}`);
        }
      } catch (err) {
        console.error('삭제 요청 중 오류 발생:', err);
        alert('삭제 도중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    console.log('API 요청 시작'); // API 요청 전 확인

    const fetchData = async () => {
      try {
        console.log('API 요청 시도 중...');
        const response = await axios.get(`${BASE_URL}/api/v1/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('서버 응답 데이터:', response.data);
        if (response.data.code === 200) {
          setContent(response.data.data);
          console.log('notice 데이터', response.data.data);
        } else {
          console.error('Error fetching post data:', response.data.message);
        }
      } catch (err) {
        // 무한 리다이렉션 방지
        if (window.location.pathname !== '/login') {
          console.error('An error occurred while fetching the data');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        console.error('API request error:', err);
      }
    };

    fetchData(); // 항상 서버에서 데이터를 가져오도록 함
  }, [postId, accessToken, BASE_URL]);

  // AttachButton에 전달할 파일 변경 핸들러 (기능이 필요 없으면 빈 함수라도 전달)
  const handleFileChange = () => {
    // 파일 변경 로직이 필요하다면 여기에 추가
    console.log('File changed');
  };

  const handleEditClick = () => {
    navigate(`/studyPosting`, {
      state: { title: content.title, content: content.content, postId },
    });
  };

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <UserAPI />
      <HeaderWrapper>
        <NoticeHeader
          onMenuClick={(action) => {
            if (action === 'delete') {
              handleDeleteClick();
            } else if (action === 'edit') {
              handleEditClick();
            }
          }}
          showModal={false}
          ModalComponent={EditDelModal} // EditDelModal을 사용
          isWriter={isWriter} // isWriter 전달
        />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          <StudyNamed>{content?.title || 'Loading...'}</StudyNamed>
          <SubRow>
            <UserName>{content?.name || 'Unknown'}</UserName>
            <StyledDate>
              {formatDateTime(content?.time) || '00/00 00:00'}
            </StyledDate>
          </SubRow>
          <StudyContents>{content?.content || 'Loading...'}</StudyContents>
        </TextContainer>
        <ComponentRow>
          {content.fileUrls && content.fileUrls.length > 0 ? (
            <AttachButton
              fileUrls={content.fileUrls}
              onFileChange={handleFileChange}
            />
          ) : null}
          <RightMargin />
        </ComponentRow>
        <CommentCountWrapper>
          <BoardChat alt="" />
          <CommentCount>{content.commentCount || 0}</CommentCount>
        </CommentCountWrapper>
        <CommentSection>
          <CommentList noticeId={null} postId={postId} />
        </CommentSection>
      </StudyRow>
    </Container>
  );
};

export default StudyDetail;
