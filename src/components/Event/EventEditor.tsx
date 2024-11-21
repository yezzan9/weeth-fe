/* eslint-disable no-alert */
import { EventRequestType, createEvent, editEvent } from '@/api/EventAdminAPI';
import getEventInfo from '@/api/getEventInfo';
import UserAPI from '@/api/UserAPI';
import { UserContext } from '@/api/UserContext';
import DatePicker from '@/components/Event/DatePicker';
import Header from '@/components/Header/Header';
import InfoInput from '@/components/MyPage/InfoInput';
import {
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/constants/dateConstants';
import useCustomBack from '@/hooks/useCustomBack';
import { replaceNewLines } from '@/hooks/Utils';
import * as S from '@/styles/event/EventEditor.styled';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function checkEmpty(field: string | undefined, message: string): boolean {
  // TODO🚨important!!🚨: 배열 내에 빈 값이 있는 경우를 처리하는 로직 추가
  if (Array.isArray(field) && field.length === 0) {
    alert(message);
    return true;
  }
  return false;
}

function parseDate(dateString: string) {
  const parts = [0, 4, 5, 7, 8, 10, 11, 13, 14, 16];
  const result: number[] = [];
  for (let i = 0; i < parts.length - 1; i += 2) {
    result.push(Number(dateString.slice(parts[i], parts[i + 1])));
  }
  return result;
}

const EventEditor = () => {
  useCustomBack('/calendar');

  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [eventRequest, setEventRequest] = useState<EventRequestType>({
    title: '',
    start: '',
    end: '',
    location: '',
    requiredItem: '',
    memberCount: '',
    content: '',
  });

  const [startArr, setStartArr] = useState([
    CURRENT_YEAR,
    CURRENT_MONTH,
    CURRENT_DAY,
    0,
    0,
  ]);
  const [endArr, setEndArr] = useState([
    CURRENT_YEAR,
    CURRENT_MONTH,
    CURRENT_DAY,
    23,
    59,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getEventInfo('events', Number(id));
          if (response.data.code === 200) {
            const { data } = response.data;
            setEventRequest({
              title: data.title,
              start: data.start,
              end: data.end,
              location: data.location,
              requiredItem: data.requiredItem,
              memberCount: data.memberCount,
              content: data.content,
            });
            setStartArr(parseDate(data.start));
            setEndArr(parseDate(data.end));
          } else {
            console.error(response.data.message);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const editEventInfo = (key: keyof EventRequestType, value: any) => {
    setEventRequest((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const onSave = async () => {
    const data = {
      ...eventRequest,
      content:
        typeof eventRequest.content === 'string'
          ? replaceNewLines(eventRequest.content)
          : '',
    };
    console.log('data', data);

    if (
      checkEmpty(data.title, '제목을 입력해 주세요.') ||
      checkEmpty(data.start, '시작 시간을 입력해 주세요.') ||
      checkEmpty(data.end, '종료 시간을 입력해 주세요.') ||
      checkEmpty(data.location, '장소를 입력해 주세요.') ||
      checkEmpty(data.requiredItem, '준비물을 입력해 주세요.') ||
      checkEmpty(data.memberCount, '총인원을 입력해 주세요.') ||
      checkEmpty(data.content, '내용을 입력해 주세요.')
    ) {
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

    if (window.confirm('저장하시겠습니까?')) {
      try {
        if (isEditMode) await editEvent(data, Number(id));
        else await createEvent(data);
        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err: any) {
        if (err.response.status === 403) {
          alert('일정 생성 및 수정은 운영진만 가능합니다.');
          return;
        }
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  if (userData && userData.role !== 'ADMIN') {
    return <S.Error>일정 생성 및 수정은 운영진만 가능합니다</S.Error>;
  }

  return (
    <S.EventEditorWrapper>
      <UserAPI />
      <Header
        title={isEditMode ? '일정 수정' : '일정 추가'}
        onClickRightButton={onSave}
        RightButtonType="TextButton"
      />
      <InfoInput
        placeholder="제목"
        origValue={eventRequest.title}
        padding="15px"
        align="left"
        editValue={(value) => editEventInfo('title', value)}
      />
      <DatePicker
        startDate={startArr}
        endDate={endArr}
        onStartDateChange={(index, value) => {
          const updatedStartDate = [...startArr];
          updatedStartDate[index] = value;
          setStartArr(updatedStartDate);
          editEventInfo('start', updatedStartDate.join('-')); // start는 문자열로 처리
        }}
        onEndDateChange={(index, value) => {
          const updatedEndDate = [...endArr];
          updatedEndDate[index] = value;
          setEndArr(updatedEndDate);
          editEventInfo('end', updatedEndDate.join('-')); // end도 문자열로 처리
        }}
      />
      {['location', 'requiredItem', 'memberCount'].map((key) => (
        <InfoInput
          key={key}
          text={
            // eslint-disable-next-line no-nested-ternary
            key === 'location'
              ? '장소'
              : key === 'requiredItem'
                ? '준비물'
                : '총인원'
          }
          origValue={eventRequest[key as keyof EventRequestType]}
          width="75%"
          padding="15px"
          align="left"
          editValue={(value) =>
            editEventInfo(key as keyof EventRequestType, value)
          }
        />
      ))}
      <S.TextAreaWrapper>
        <S.TextArea
          placeholder="내용"
          value={eventRequest.content}
          onChange={(e) => editEventInfo('content', e.target.value)}
        />
      </S.TextAreaWrapper>
    </S.EventEditorWrapper>
  );
};

export default EventEditor;