import { useEffect, useRef, useState } from 'react';
import PostListItem from '@/components/Board/PostListItem';
import formatDate from '@/hooks/formatDate';
import useGetBoardInfo, { useGetRecentNotice } from '@/api/useGetBoardInfo';
import * as S from '@/styles/board/Board.styled';
import Header from '@/components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useDraggable } from '@/hooks/useDraggable';
import PostingButton from '@/components/Board/PostingButton';

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  position: string;
  role: string;
}

const Board = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { recentNotices, error } = useGetRecentNotice();

  const path = 'posts';

  const observerRef = useRef<HTMLDivElement | null>(null);

  const scrollerRef1 = useRef<HTMLDivElement | null>(null);

  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef1);

  const handleNoticeCard = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
  ) => {
    e.preventDefault();
    navigate(`/notice/${id}`);
  };

  const handleAllNotice = () => {
    navigate('/notice');
  };

  const handlePosting = () => {
    navigate('/study/post');
  };

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          useGetBoardInfo(path, pageNumber, setPosts, setHasMore, setIsLoading);
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

  console.log(posts);

  return (
    <S.Container>
      <Header title="게시판" RightButtonType="none" />
      <S.NoticeTextContainer>
        <S.NoticeTitleText>📢 공지사항</S.NoticeTitleText>
        <S.AllText onClick={handleAllNotice}>전체보기 &gt;</S.AllText>
      </S.NoticeTextContainer>

      {error ? (
        <div>에러</div>
      ) : (
        <S.ScrollContainer
          ref={scrollerRef1}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {recentNotices.map((notice) => (
            <S.NoticeCard
              key={notice.id}
              onClick={(e) => handleNoticeCard(e, notice.id)}
            >
              <S.NoticeTitle>{notice.title}</S.NoticeTitle>
              <S.NoticeContent>{notice.content}</S.NoticeContent>
            </S.NoticeCard>
          ))}
        </S.ScrollContainer>
      )}
      <S.TabContainerWrapper>
        <S.TabContainer>
          <S.TabText>자유게시판</S.TabText>
          <S.Underline />
        </S.TabContainer>
      </S.TabContainerWrapper>

      {posts.map((post) => (
        <S.PostListContainer key={post.id}>
          <PostListItem
            name={post.name}
            time={formatDate(post.time)}
            title={post.title}
            content={post.content}
            totalComments={post.commentCount}
            hasFile={post.hasFile}
            position={post.position}
            role={post.role}
            onClick={() => navigate(`/board/${post.id}`)}
          />
          <S.Line />
        </S.PostListContainer>
      ))}
      {hasMore && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}
      {isLoading && <S.Text>로딩 중...</S.Text>}
      {!hasMore && <S.Text>마지막 게시물입니다.</S.Text>}
      <S.PostingButtonContainer>
        <PostingButton onClick={handlePosting} />
      </S.PostingButtonContainer>
    </S.Container>
  );
};

export default Board;
