const mockBoard = [
  {
    name: '사용자1',
    time: '10/15 14:30',
    title: 'React 프로젝트 회의',
    content: '다음 회의는 화요일 오후 3시입니다. 참석 바랍니다.',
    onClick: () => console.log('게시글 1 클릭'),
    totalComments: 5,
  },
  {
    name: '사용자2',
    time: '10/16 09:10',
    title: '스터디 모집',
    content:
      'React 스터디 멤버를 모집합니다. 관심 있는 분들은 댓글 남겨주세요!',
    onClick: () => console.log('게시글 2 클릭'),
    totalComments: 8,
  },
  {
    name: '사용자3',
    time: '10/17 11:45',
    title: '개발 자료 공유',
    content: '유용한 개발 자료를 공유합니다. 참고하시기 바랍니다.',
    onClick: () => console.log('게시글 3 클릭'),
    totalComments: 3,
  },
  {
    name: '사용자4',
    time: '10/18 13:20',
    title: '스터디 진행 안내',
    content: '오늘 스터디는 5시에 진행됩니다. 준비해주세요.',
    onClick: () => console.log('게시글 4 클릭'),
    totalComments: 10,
  },
  {
    name: '사용자5',
    time: '10/19 15:00',
    title: '질문 있습니다!',
    content: 'React 상태 관리에 대해 질문이 있습니다. 조언 부탁드립니다.',
    onClick: () => console.log('게시글 5 클릭'),
    totalComments: 12,
  },
  {
    name: '사용자6',
    time: '10/20 10:15',
    title: '코드 리뷰 요청',
    content: '제가 작성한 코드를 리뷰해주실 분 구합니다. 의견 부탁드려요!',
    onClick: () => console.log('게시글 6 클릭'),
    totalComments: 7,
  },
  {
    name: '사용자7',
    time: '10/21 08:45',
    title: '프로젝트 진행 상황 공유',
    content: '현재 프로젝트 진행 상황을 공유합니다. 참고해주세요.',
    onClick: () => console.log('게시글 7 클릭'),
    totalComments: 4,
  },
  {
    name: '사용자8',
    time: '10/22 12:00',
    title: '새로운 스터디 제안',
    content: '새로운 주제로 스터디를 시작하고자 합니다. 의견 부탁드립니다.',
    onClick: () => console.log('게시글 8 클릭'),
    totalComments: 9,
  },
  {
    name: '사용자9',
    time: '10/23 14:50',
    title: '프로젝트 피드백 요청',
    content: '프로젝트에 대한 피드백을 받고 싶습니다. 많은 의견 부탁드려요.',
    onClick: () => console.log('게시글 9 클릭'),
    totalComments: 15,
  },
  {
    name: '사용자10',
    time: '10/24 16:25',
    title: '스터디 장소 변경 안내',
    content:
      '스터디 장소가 변경되었습니다. 새로운 장소는 이메일로 확인해주세요.',
    onClick: () => console.log('게시글 10 클릭'),
    totalComments: 2,
  },
  {
    name: '사용자11',
    time: '10/25 09:30',
    title: '이벤트 참여 안내',
    content: '다음 주에 진행될 이벤트에 많은 참여 부탁드립니다.',
    onClick: () => console.log('게시글 11 클릭'),
    totalComments: 6,
  },
  {
    name: '사용자12',
    time: '10/26 11:10',
    title: '오프라인 모임 계획',
    content:
      '오프라인 모임을 계획 중입니다. 참여 가능하신 분은 댓글로 알려주세요.',
    onClick: () => console.log('게시글 12 클릭'),
    totalComments: 5,
  },
  {
    name: '사용자13',
    time: '10/27 15:40',
    title: '도서 추천',
    content: '프로그래밍 관련 추천 도서를 공유합니다. 읽어보세요!',
    onClick: () => console.log('게시글 13 클릭'),
    totalComments: 11,
  },
  {
    name: '사용자14',
    time: '10/28 13:00',
    title: '기술 발표 준비 중',
    content: '다음 주 기술 발표를 준비 중입니다. 발표 자료 검토 부탁드립니다.',
    onClick: () => console.log('게시글 14 클릭'),
    totalComments: 14,
  },
  {
    name: '사용자15',
    time: '10/29 17:15',
    title: '프로젝트 마감 임박',
    content: '프로젝트 마감일이 다가오고 있습니다. 마무리 작업 부탁드립니다.',
    onClick: () => console.log('게시글 15 클릭'),
    totalComments: 13,
  },
];

export default mockBoard;