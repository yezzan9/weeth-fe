import styled from 'styled-components';
import { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import theme from '../../styles/theme';
import ReceiptInfo from './ReceiptInfo';
import { DuesContext } from '../../hooks/DuesContext';
import DuesAPI from '../../hooks/DuesAPI';

const StyledReceipt = styled.div`
  width: 370px;
  height: calc(var(--vh, 1vh) * 100);
  font-family: ${theme.font.family.pretendard_regular};
`;

const Line = styled.div`
  border: 1px solid;
  color: #4d4d4d;
  width: 88%;
  margin: 15px 6% 0 6%;
  transform: scaleY(0.2);
`;

const StyledMonth = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  margin: 15px 0 0 6%;
`;

const ScrollContainer = styled.div`
  display: flex;
  width: 88%;
  margin: 15px 6% 0 6%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
`;

const GridItem = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 0;
  background-color: ${theme.color.grayScale.gray18};
  width: 56%;
  height: 124px;
  color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

const GridItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ReceiptMain = () => {
  const { duesData } = useContext(DuesContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
  };

  const groupedByMonth = duesData.reduce((acc, curr) => {
    const month = new Date(curr.date).getMonth() + 1;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(curr);
    return acc;
  }, {});

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  let months = [];
  if (currentMonth >= 3 && currentMonth <= 8) {
    months = [3, 4, 5, 6, 7, 8];
  } else {
    months = [9, 10, 11, 12, 1, 2];
  }

  return (
    <StyledReceipt>
      <DuesAPI />
      {months.map((month) => (
        <div key={month}>
          <StyledMonth>{month}월</StyledMonth>
          {groupedByMonth[month] ? (
            groupedByMonth[month].map((receipt) => (
              <div key={receipt.id}>
                <ReceiptInfo
                  money={`${receipt.amount.toLocaleString()}`}
                  date={new Date(receipt.date).toLocaleDateString('ko-KR')}
                  memo={receipt.description}
                />
                <ScrollContainer>
                  {receipt.images.length > 0 ? (
                    receipt.images.map((image, index) => (
                      <GridItem
                        key={receipt.id}
                        onClick={() => openModal(image)}
                      >
                        <GridItemImage
                          src={image}
                          alt={`영수증 사진 ${index + 1}`}
                        />
                      </GridItem>
                    ))
                  ) : (
                    <div> </div>
                  )}
                </ScrollContainer>
              </div>
            ))
          ) : (
            <div> </div>
          )}
          <Line />
        </div>
      ))}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '45%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            background: 'none',
            width: '50%',
            height: '50%',
            overflow: 'hidden',
          },
        }}
      >
        <ModalImage src={selectedImage} alt="영수증 큰 이미지" />
      </ReactModal>
    </StyledReceipt>
  );
};

export default ReceiptMain;
