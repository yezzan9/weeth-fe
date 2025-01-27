import { createContext, useContext, useMemo, useState } from 'react';

export type MemberData = {
  status: '승인 완료' | '대기 중' | '추방';
  name: string;
  role: string;
  major: string;
  cardinal: string;
  phone: string;
  studentId: string;
  position: string;
  attendance: number;
  absence: number;
  penalty: number;
  LatestPenalty?: string;
  joinDate: string;
  email?: string;
  membershipType?: string;
};

interface MemberContextProps {
  members: MemberData[]; // 전체 멤버 데이터
  setMembers: React.Dispatch<React.SetStateAction<MemberData[]>>;
  selectedMembers: string[]; // 선택된 멤버 ID 리스트
  filteredMembers: MemberData[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<string[]>>;
  setFilteredMembers: React.Dispatch<React.SetStateAction<MemberData[]>>;
}

// context 생성
const MemberContext = createContext<MemberContextProps | undefined>(undefined);

// provider를 통해 상태와 업데이트 함수 전달
export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [members, setMembers] = useState<MemberData[]>([
    // mock data
    {
      status: '승인 완료',
      name: '김위드니',
      role: '프론트엔드',
      major: '소프트웨어전공',
      cardinal: '4.3.2.1',
      phone: '01000009999',
      studentId: '202236123',
      position: '사용자',
      attendance: 12,
      absence: 0,
      penalty: 12,
      joinDate: '2024.08.27',
      email: 'weeth123@gmail.com',
      membershipType: '알럼나이',
      LatestPenalty: '2024.08.27',
    },
    {
      status: '대기 중',
      name: '박위드니',
      role: '프론트엔드',
      major: '미디어커뮤니케이션학과',
      cardinal: '4',
      phone: '01000009999',
      studentId: '202136123',
      position: '사용자',
      attendance: 12,
      absence: 0,
      penalty: 12,
      joinDate: '2024.08.27',
      email: 'weeth123@gmail.com',
      membershipType: '활동중',
      LatestPenalty: '2024.08.27',
    },
    {
      status: '승인 완료',
      name: '송위드니',
      role: '백엔드',
      major: '컴퓨터공학과',
      cardinal: '4.3',
      phone: '01000009999',
      studentId: '202334423',
      position: '사용자',
      attendance: 12,
      absence: 0,
      penalty: 12,
      joinDate: '2024.08.27',
      email: 'weeth123@gmail.com',
      membershipType: '활동중',
      LatestPenalty: '2024.08.27',
    },
    {
      status: '승인 완료',
      name: '홍위드니',
      role: '백엔드',
      major: '컴퓨터공학과',
      cardinal: '3.2',
      phone: '01000009999',
      studentId: '202331423',
      position: '사용자',
      attendance: 12,
      absence: 0,
      penalty: 12,
      joinDate: '2024.08.27',
      email: 'weeth123@gmail.com',
      membershipType: '활동중',
      LatestPenalty: '2024.08.27',
    },
    {
      status: '추방',
      name: '최위드니',
      role: '백엔드',
      major: '컴퓨터공학과',
      cardinal: '2.1',
      phone: '01000009999',
      studentId: '202436123',
      position: '사용자',
      attendance: 12,
      absence: 0,
      penalty: 12,
      joinDate: '2024.08.27',
    },
  ]);

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>(members);

  const value = useMemo(
    () => ({
      members,
      setMembers,
      selectedMembers,
      setSelectedMembers,
      filteredMembers,
      setFilteredMembers,
    }),
    [members, selectedMembers, filteredMembers],
  );

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
};

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error(
      'useMemberContext는 MemberProvider 내에서만 사용할 수 있습니다',
    );
  }
  return context;
};
