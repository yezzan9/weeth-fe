import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BoardContext } from '../hooks/BoardContext';
import PostingHeader from '../components/Board/PostingHeader';
import FileAttachMenu from '../components/Board/FileAttachMenu';
import { ReactComponent as FileAttach } from '../assets/images/ic_board_fileAttach.svg';
import theme from '../styles/theme';

const StyledPosting = styled.div`
  width: 370px;
`;

const StyledText = styled.div`
  margin-left: 7%;
  color: ${theme.color.grayScale.white};
  font-size: 16px;
  line-height: 19.09px;
`;

const StyledTitle = styled.input`
  width: 88%;
  margin-top: 20px;
  margin-bottom: 20px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  outline: none;

  font-size: 16px; // 확대 방지
`;

const StyledLine = styled.div`
  width: 88%;
  height: 1px;
  margin: 0 7%;
  background-color: ${theme.color.grayScale.gray30};
`;

const StyledContent = styled.textarea`
  width: 88%;
  margin-top: 12px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_regular};
  padding: 10px 0;
  outline: none;
  resize: none;
  height: 455px;

  font-size: 16px; // 확대 방지
`;

const StudyPosting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    title: initialTitle = '',
    content: initialContent = '',
    postId,
  } = location.state || {};

  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { setBoardData } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [boardPost, setBoardPost] = useState({
    title: initialTitle,
    content: initialContent,
  });

  useEffect(() => {
    setIsCompleteEnabled(!!boardPost.title && boardPost.content.length >= 1);
  }, [boardPost.title, boardPost.content]);

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoardPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const saveBoard = async () => {
    console.log('선택된 파일들:', files);

    const formData = new FormData();

    // JSON 데이터를 'dto' 필드로 추가
    formData.append(
      'dto',
      new Blob([JSON.stringify(boardPost)], { type: 'application/json' }),
    );
    files.forEach((file) => formData.append('files', file.file));

    // 파일이 선택되었을 경우에만 'files' 필드를 추가
    if (files && files.length > 0) {
      files.forEach((file) => {
        console.log(
          `파일명: ${file.name}, 파일 크기: ${file.size} bytes, 파일 타입: ${file.type}`,
        );
        formData.append('files', file); // 'files' 필드에 각각 파일을 추가
      });
    }

    try {
      let url;
      if (postId) {
        url = `${BASE_URL}/api/v1/posts/${postId}`;
      } else {
        url = `${BASE_URL}/api/v1/posts`;
      }

      const method = postId ? 'patch' : 'post';

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('서버에 게시글 POST 후 응답 데이터:', response.data);

      if (response.data.code === 200) {
        console.log('서버 응답:', response.data);
        alert(postId ? '게시글이 수정되었습니다.' : '게시글이 생성되었습니다.');
        setBoardData(response.data.data);
        navigate('/board');
      } else {
        console.error('Error:', response.data.message);
        alert(`Error: ${response.data.message}`);
      }
    } catch (err) {
      console.error('Error saving board study:', err);
      if (err.response && err.response.data && err.response.data.message) {
        console.error('Error message from server:', err.response.data.message);
      }
    }
  };

  const handleBoardClick = () => {
    if (boardPost.title && boardPost.content.length >= 1) {
      saveBoard();
    }
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <StyledPosting>
      <PostingHeader
        isRightButtonEnabled={isCompleteEnabled}
        onCompleteClick={handleBoardClick}
      />
      <StyledText>
        <StyledTitle
          type="text"
          placeholder="제목"
          name="title"
          value={boardPost.title}
          onChange={onChange}
        />
      </StyledText>
      <StyledLine />
      <StyledText>
        <StyledContent
          placeholder="내용을 입력하세요."
          name="content"
          value={boardPost.content}
          onChange={onChange}
        />
      </StyledText>
      <FileAttach
        alt=""
        onClick={handleOpenMenu}
        style={{ marginLeft: '7%', marginBottom: '148px' }}
      />

      <FileAttachMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onFilesChange={setFiles}
      />
    </StyledPosting>
  );
};

export default StudyPosting;
