import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import { ReactComponent as InstallIcon } from '../../assets/images/ic_install.svg';

const Container = styled.div`
  width: 30%;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: auto; /* Button width adjusts to text */
  height: 56px;
  margin-top: 40px;
  margin-right: 0;
  background-color: #0e9871;
  border-radius: 5px;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 14px;
  cursor: pointer;
  border: none;
  padding: 0 2px; /* 텍스트 주변에 약간의 패딩을 추가 */

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
  }

  .icon {
    margin: 30px 5px 0 5px;
  }
`;

const FileName = styled.div`
  margin-bottom: 5px;
`;

const AttachButton = ({ fileUrls = [] }) => {
  const handleButtonClick = async () => {
    try {
      await Promise.all(
        fileUrls.map(async (fileUrl) => {
          const response = await fetch(fileUrl);
          if (!response.ok) {
            throw new Error(`Failed to download file: ${fileUrl}`);
          }
          const blob = await response.blob();
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = fileUrl.split('/').pop(); // Extract filename from URL
          document.body.appendChild(link); // Append to DOM to make it clickable
          link.click(); // Trigger download
          document.body.removeChild(link); // Remove from DOM after clicking
          window.URL.revokeObjectURL(url); // Release memory
        }),
      );
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
    }
  };

  return (
    <Container>
      <StyledButton onClick={handleButtonClick}>
        <div className="text">
          <FileName>첨부파일</FileName>
        </div>
        <InstallIcon
          className="icon"
          alt="install"
          style={{
            marginBottom: '5px',
          }}
        />
      </StyledButton>
    </Container>
  );
};

AttachButton.propTypes = {
  fileUrls: PropTypes.arrayOf(PropTypes.string),
};

AttachButton.defaultProps = {
  fileUrls: [],
};

export default AttachButton;
