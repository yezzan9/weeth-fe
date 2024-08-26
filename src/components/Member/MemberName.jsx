/* eslint-disable react/require-default-props */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import FE from '../../assets/images/ic_FE.svg';
import BE from '../../assets/images/ic_BE.svg';
import D from '../../assets/images/ic_DE.svg';
import MA from '../../assets/images/ic_MA.svg';

import theme from '../../styles/theme';

const MemberWrapper = styled.div`
  padding: 20px 10px 0px 10px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  background-color: ${theme.color.grayScale.gray18};

  &:first-of-type {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

const MemberContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.grayScale.gray30};
  width: 325px;
  margin: auto;
  margin-top: 10px;
  transform: scaleY(0.2);
`;

const Caption = styled.div`
  font-size: 12px;
`;

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const MemberName = ({
  name,
  studentId,
  department,
  email,
  cardinal,
  position,
  isLast = false,
}) => {
  let imgSrc;
  let alt;
  const navi = useNavigate();

  if (position === 'FE') {
    imgSrc = FE;
    alt = 'FE';
  } else if (position === 'BE') {
    imgSrc = BE;
    alt = 'BE';
  } else if (position === 'D') {
    imgSrc = D;
    alt = 'D';
  } else {
    imgSrc = MA;
    alt = 'MA';
  }

  const onClickMember = () => {
    navi(`/member/${name}`, {
      state: { name, studentId, department, email, cardinal, position },
    });
  };

  return (
    <MemberWrapper>
      <MemberContent onClick={onClickMember}>
        <img src={imgSrc} alt={alt} />
        <TextWrapper>
          <div>{name}</div>
          <Caption>{cardinal[0]}기</Caption>
        </TextWrapper>
      </MemberContent>
      {!isLast && <Line />}
    </MemberWrapper>
  );
};

MemberName.propTypes = {
  name: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cardinal: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
};

export default MemberName;
