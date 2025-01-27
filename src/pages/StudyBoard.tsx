import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PostListItem from '@/components/Board/PostListItem';
import formatDate from '@/hooks/formatDate';
import theme from '@/styles/theme';
import useGetBoardInfo from '@/api/useGetBoardInfo';
import * as S from '@/styles/board/PostDetail.styled';
import Header from '@/components/Header/Header';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Line = styled.div`
  border: 1px solid;
  color: ${(props) => props.theme.color.gray[30]};
  margin-top: 10px;
`;

const Text = styled.div`
  text-align: center;
  margin: 10px;
  font-family: ${theme.font.semiBold};
`;

const PostListContainer = styled.div`
  margin: 5px 25px 0 25px;
`;

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
}

const StudyBoard = () => {
  const navigate = useNavigate();
  const isPostButtonVisible = true;

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const path = 'posts';

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          useGetBoardInfo(
            BASE_URL,
            path,
            pageNumber,
            setPosts,
            setHasMore,
            setIsLoading,
          );
          setPageNumber((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, isLoading, pageNumber]);

  return (
    <Container>
      <Header RightButtonType="none" isAccessible>
        스터디 게시판
      </Header>
      <S.InfoContainer>
        <S.TextContainer>
          <S.InfoTitleText>스터디 게시판</S.InfoTitleText>
          <S.InfoText>자세한 내용을 보려면 게시물을 클릭하세요.</S.InfoText>
        </S.TextContainer>
        {isPostButtonVisible && <S.PostingButton>글쓰기</S.PostingButton>}
      </S.InfoContainer>
      {posts.map((post) => (
        <PostListContainer key={post.id}>
          <PostListItem
            name={post.name}
            time={formatDate(post.time)}
            title={post.title}
            content={post.content}
            totalComments={post.commentCount}
            onClick={() => navigate(`/study/${post.id}`)}
          />
          <Line />
        </PostListContainer>
      ))}
      {hasMore && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}
      {isLoading && <Text>로딩 중...</Text>}
      {!hasMore && <Text>마지막 게시물입니다.</Text>}
    </Container>
  );
};

export default StudyBoard;
