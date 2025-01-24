import './App.css';
import './assets/fonts/fonts.css';

import ScrollToTop from '@/hooks/ScrollToTop';
import Attendance from '@/pages/Attendance';
import AttendCheck from '@/pages/AttendCheck';
import Calendar from '@/pages/Calendar';
import Dues from '@/pages/Dues';
import Edit from '@/pages/Edit';
import EventAdmin from '@/pages/EventAdmin';
import EventDetails from '@/pages/EventDetails';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Member from '@/pages/Member';
import MemberDetail from '@/pages/MemberDetail';
import MyPage from '@/pages/MyPage';
import Profile from '@/pages/Profile';
import Receipt from '@/pages/Receipt';
import Signup from '@/pages/Signup';
import theme from '@/styles/theme';

import AdminAttendance from '@/pages/admin/AdminAttendance';
import AdminMember from '@/pages/admin/AdminMember';
import AdminDues from '@/pages/admin/AdminDues';
import AdminPenalty from '@/pages/admin/AdminPenalty';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Notice from '@/pages/Notice';
import NoticePostDetail from '@/pages/NoticePostDetail';
import BoardPostDetail from '@/pages/BoardPostDetail';
import Board from '@/pages/Board';
import BoardPost from '@/pages/BoardPost';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/:type/:id" element={<EventDetails />} />
        <Route path="/events/create" element={<EventAdmin />} />
        <Route path="/events/:id/edit" element={<EventAdmin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/attendCheck" element={<AttendCheck />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/:userId" element={<MemberDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/dues" element={<Dues />} />
        <Route path="/receipt" element={<Receipt />} />

        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:postId" element={<NoticePostDetail />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:postId" element={<BoardPostDetail />} />
        <Route path="/:type/post" element={<BoardPost />} />

        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/member" element={<AdminMember />} />
        <Route path="/admin/dues" element={<AdminDues />} />
        <Route path="/admin/penalty" element={<AdminPenalty />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
