import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardComponent from './BoardComponent';
import { BoardContext } from '../../hooks/BoardContext';
import more from '../../assets/images/ic_moreButton.svg';

const StudyList = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // API 호출 함수
  const fetchStudies = async (postId = null, count = 15) => {
    try {
      const params = { count: count || 15 };
      if (postId) {
        params.postId = postId;
      }
  
      console.log("Request Params:", params);
  
      const response = await axios.get(`${BASE_URL}/api/v1/posts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });
  
      console.log("API Response:", response); // 응답 전체를 로그로 출력
  
      if (response.status === 200 && response.data.code === 200) {
        const studiesData = response.data.data;

        if (studiesData.length === 0) {
          console.log("No more studies to load.");
          setHasMore(false);
        } else {
        const newStudies = studiesData.map(study => ({
          id: study.id,
          name: study.name,
          title: study.title,
          content: study.content,
          time: study.time,
          commentCount: study.commentCount
        }));

        setStudies(prevStudies => [...prevStudies, ...newStudies]);
        setHasMore(!response.data.isLastPage);
      }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Request Error:", error); // 요청 에러 로그 출력

      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 400
      ) {
        console.error("Error: Non-existent post ID.");
      } else {
          setHasMore(false); // 재시도 중에도 오류가 발생했으므로 더 이상 로드할 공지가 없다고 처리
      }
    }
  };

  // 컴포넌트 마운트 시 서버로부터 최신 데이터를 로드
  useEffect(() => {
    fetchStudies(); // 컴포넌트가 처음 마운트될 때 최신 데이터를 가져옴
  }, [accessToken]);

  // 더 많은 데이터를 로드하는 함수
  const loadMoreStudies = () => {
    if (studies.length > 0) {
      const lastStudy = studies[studies.length - 1];
      if (lastStudy && lastStudy.id) {
        console.log('loadMoreStudies: Fetching with postId:', lastStudy.id, 'and count: 15');
        fetchStudies(lastStudy.id, 15);
      }
    } else {
      console.log('loadMoreStudies: Fetching initial studies with count: 15');
      fetchStudies(null, 15);
    }
  };

  // 게시글 클릭 시 상세 페이지로 이동
  const handleNavigate = (study) => {
    navigate(`/board/posts/${study.id}`, { state: { type: 'study', data: study } });
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    width: '62px',
    height: '20px',
  };

  const imgStyle = {
    width: '62px',
    height: '20px',
  };

  return (
    <div>
      {studies.length > 0 ? (
        <>
          {studies.map((study) => (
            <BoardComponent
              key={study.id}
              name={study.name}
              title={study.title}
              content={study.content}
              time={study.time}
              totalComments={parseInt(study.commentCount, 10) || 0}
              onClick={() => handleNavigate(study)}
            />
          ))}

          {hasMore ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100px',
                transform: 'translateY(-10px)',
              }}
            >
              <button
                type="button"
                style={buttonStyle}
                onClick={loadMoreStudies}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    loadMoreStudies();
                  }
                }}
              >
                <img src={more} alt="Load more" style={imgStyle} />
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100px',
                transform: 'translateY(-10px)',
              }}
            >
              더 이상 불러올 게시물이 없습니다.
            </div>
          )}
        </>
      ) : (
        !hasMore && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100px',
              transform: 'translateY(-10px)',
            }}
          >
            더 이상 불러올 게시물이 없습니다.
          </div>
        )
      )}
    </div>
  );
};

export default StudyList;
