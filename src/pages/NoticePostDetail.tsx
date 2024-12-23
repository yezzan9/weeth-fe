import useGetBoardDetail from '@/api/useGetBoardDetail';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const NoticePostDetail = () => {
  const openModal = () => {
    console.log('모달 열림');
  };

  // useGetBoardDetail 훅 호출
  const { boardDetailInfo, error } = useGetBoardDetail('notices', 65);

  if (error) return <div>오류: {error}</div>;

  return (
    <Container>
      <Header
        title="게시판"
        RightButtonType="MENU"
        isAccessible
        onClickRightButton={openModal}
      />
      {boardDetailInfo && (
        <>
          <PostDetailMain info={boardDetailInfo} />
          <PostCommentList comments={boardDetailInfo.comments} />
        </>
      )}
    </Container>
  );
};

export default NoticePostDetail;
