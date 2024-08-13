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

const StyledTextArea = styled.textarea`
  height: 504px;
  resize: none;
  padding: 15px 10px;
  margin: 12px 15px;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const today = new Date();
const getValue = (status) => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const valueArr = [year, month, day, hour, minute];

  return status === 'start' ? valueArr : [];
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
  const { infoData, error } = useContext(EventInfoContext);
  console.log(error);
  const [eventInfo, setEventInfo] = useState([
    { key: 'title', value: '' },
    { key: 'start', value: getValue('start') },
    { key: 'end', value: [] },
    { key: 'location', value: '' },
    { key: 'requiredItem', value: '' },
    { key: 'memberCount', value: '' },
    { key: 'content', value: '' },
  ]);

  const [startArr, setStartArr] = useState(getValue('start'));
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

    let response;

    if (window.confirm('저장하시겠습니까?')) {
      try {
        if (isEditMode) response = await editEvent(data, id);
        else response = await createEvent(data);

        console.log(response);
        console.log('전달할 데이터', data);

        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err) {
        console.error(err);
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <StyledCreate>
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
      <StyledTextArea
        placeholder="내용"
        value={eventInfo.find((item) => item.key === 'content')?.value || ''}
        onChange={(e) => editValue('content', e.target.value)}
      />
    </StyledCreate>
  );
};

export default EventAdmin;
