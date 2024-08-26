/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';
import Header from '../components/Header/Header';
import InfoInput from '../components/MyPage/InfoInput';
import DatePicker from '../components/Calendar/DatePicker';
import { replaceNewLines } from '../hooks/Utils';
import { createEvent, editEvent } from '../hooks/EventAdminAPI';
import EventInfoAPI from '../hooks/EventInfoAPI';
import { EventInfoContext } from '../hooks/EventInfoContext';
import useCustomBack from '../router/useCustomBack';
import UserAPI from '../hooks/UserAPI';
import { UserContext } from '../hooks/UserContext';

const StyledCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 183px;
`;

const DatePickerWrapper = styled.div`
  height: 86px;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  margin: 12px 15px 4px 15px;
  padding-top: 10px;
`;

const TextAreaWrapper = styled.div`
  margin: 12px 10px;
  width: 344px;
  background-color: ${theme.color.grayScale.gray18};
  border-radius: 4px;
`;

const StyledTextArea = styled.textarea`
  height: 504px;
  width: 310px;
  margin: 15px 10px;
  padding-right: 10px;
  resize: none;
  border: none;
  outline: none;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;

  &::-webkit-scrollbar {
    width: 5px;
    margin: 15px 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const getTodayArr = () => {
  const today = new Date();
  return [
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
    today.getHours(),
    today.getMinutes(),
  ];
};

const ISOToArray = (isoString) => {
  if (!isoString) return [];
  const date = new Date(isoString);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

const EventAdmin = () => {
  useCustomBack('/calendar');

  const { userData } = useContext(UserContext);
  const { infoData, error } = useContext(EventInfoContext);
  const [eventInfo, setEventInfo] = useState([
    { key: 'title', value: '' },
    { key: 'start', value: getTodayArr() },
    { key: 'end', value: [] },
    { key: 'location', value: '' },
    { key: 'requiredItem', value: '' },
    { key: 'memberCount', value: '' },
    { key: 'content', value: '' },
  ]);

  const [startArr, setStartArr] = useState(getTodayArr('start'));
  const [endArr, setEndArr] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && infoData) {
      const updatedEventInfo = eventInfo.map((item) => {
        if (item.key === 'start') {
          const startArray = ISOToArray(infoData.start);
          setStartArr(startArray);
          return { ...item, value: startArray };
        }
        if (item.key === 'end') {
          const endArray = ISOToArray(infoData.end);
          setEndArr(endArray);
          return { ...item, value: endArray };
        }
        return { ...item, value: infoData[item.key] || item.value };
      });
      setEventInfo(updatedEventInfo);
    }
  }, [isEditMode, infoData]);

  const editValue = (key, value) => {
    const updatedEventInfo = eventInfo.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setEventInfo(updatedEventInfo);
  };

  const editDate = (key, date) => {
    const updatedEventInfo = eventInfo.map((item) =>
      item.key === key ? { ...item, value: date } : item,
    );
    setEventInfo(updatedEventInfo);
  };

  const onSave = async () => {
    const title = eventInfo.find((item) => item.key === 'title').value;
    const location = eventInfo.find((item) => item.key === 'location').value;
    const requiredItem = eventInfo.find(
      (item) => item.key === 'requiredItem',
    ).value;
    const memberCount = eventInfo.find(
      (item) => item.key === 'memberCount',
    ).value;
    let content = eventInfo.find((item) => item.key === 'content').value;

    content = replaceNewLines(content);

    const data = eventInfo.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    const dateArrayToKSTISO = (dateArray) => {
      if (dateArray.length === 5) {
        const [year, month, day, hour, minute] = dateArray;
        const dateObj = new Date(year, month - 1, day, hour, minute);
        const KST_OFFSET = 9 * 60;
        const kstDate = new Date(dateObj.getTime() + KST_OFFSET * 60 * 1000);
        return kstDate.toISOString().replace('Z', '');
      }
      return '';
    };

    const startDate = eventInfo.find((item) => item.key === 'start').value;
    const endDate = eventInfo.find((item) => item.key === 'end').value;

    data.start = dateArrayToKSTISO(startDate);
    data.end = dateArrayToKSTISO(endDate);

    if (
      !title.trim() &&
      !location.trim() &&
      !requiredItem.trim() &&
      !memberCount.trim() &&
      !content.trim()
    ) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    if (!data.start) {
      alert('시작 시간을 입력해주세요.');
      return;
    }

    if (!data.end) {
      alert('종료 시간을 입력해주세요.');
      return;
    }

    if (data.start === data.end) {
      alert('시작 시간과 종료 시간은 같을 수 없습니다.');
      return;
    }

    if (data.start > data.end) {
      alert('종료 시간은 시작 시간보다 빠를 수 없습니다.');
      return;
    }

    if (!title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }

    if (!location.trim()) {
      alert('장소를 입력해 주세요.');
      return;
    }

    if (!requiredItem.trim()) {
      alert('준비물을 입력해 주세요.');
      return;
    }

    if (!memberCount.trim()) {
      alert('총인원을 입력해 주세요.');
      return;
    }

    if (!content.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    if (window.confirm('저장하시겠습니까?')) {
      try {
        if (isEditMode) await editEvent(data, id);
        else await createEvent(data);
        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err) {
        console.log('response', err.response);
        if (err.response.status === 403) {
          alert('일정 생성 및 수정은 운영진만 가능합니다.');
          return;
        }
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  if (error) {
    return null;
  }

  if (userData.role !== 'ADMIN') {
    return <Error>일정 생성 및 수정은 운영진만 가능합니다</Error>;
  }

  return (
    <StyledCreate>
      <UserAPI />
      <EventInfoAPI id={id} />
      <Header
        title={isEditMode ? '일정 수정' : '일정 추가'}
        text="완료"
        color="mainColor"
        onClick={onSave}
      />
      <InfoInput
        placeholder="제목"
        origValue={eventInfo.find((item) => item.key === 'title')?.value || ''}
        padding="15px"
        align="left"
        editValue={(value) => editValue('title', value)}
      />
      <DatePickerWrapper>
        <DatePicker
          status="start"
          onDateChange={(index, value) => {
            const startDate = [...startArr];
            startDate[index] = value;
            setStartArr(startDate);
            editDate('start', startDate);
          }}
          date={startArr}
        />
        <DatePicker
          status="end"
          onDateChange={(index, value) => {
            const endDate = [...endArr];
            endDate[index] = value;
            setEndArr(endDate);
            editDate('end', endDate);
          }}
          date={endArr}
        />
      </DatePickerWrapper>
      <InfoInput
        text="장소"
        origValue={
          eventInfo.find((item) => item.key === 'location')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('location', value)}
      />
      <InfoInput
        text="준비물"
        origValue={
          eventInfo.find((item) => item.key === 'requiredItem')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('requiredItem', value)}
      />
      <InfoInput
        text="총인원"
        origValue={
          eventInfo.find((item) => item.key === 'memberCount')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('memberCount', value)}
      />
      <TextAreaWrapper>
        <StyledTextArea
          placeholder="내용"
          value={eventInfo.find((item) => item.key === 'content')?.value || ''}
          onChange={(e) => editValue('content', e.target.value)}
        />
      </TextAreaWrapper>
    </StyledCreate>
  );
};

export default EventAdmin;
