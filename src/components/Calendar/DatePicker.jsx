import PropTypes from 'prop-types';
import styled from 'styled-components';

import icCalendar from '../../assets/images/ic_date.svg';
import icWave from '../../assets/images/ic_wave.svg';
import DateInput from './DateInput';

const StyledPicker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const WaveImg = styled.img`
  margin: 0px 6px;
`;

const DatePicker = ({ status, onDateChange, date }) => {
  // console.log('date', date[0]);
  return (
    <StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value={date[0]}
        width="58px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(0, value)}
        inputType="year"
      />
      년
      <DateInput
        value={date[1]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(1, value)}
        inputType="month"
      />
      월
      <DateInput
        value={date[2]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(2, value)}
        inputType="day"
      />
      일
      <DateInput
        value={date[3]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(3, value)}
        inputType="hour"
      />
      :
      <DateInput
        value={date[4]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(4, value)}
        inputType="minute"
      />
    </StyledPicker>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  status: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.arrayOf(PropTypes.number).isRequired,
};
