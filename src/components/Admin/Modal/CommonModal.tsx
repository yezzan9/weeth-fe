import theme from '@/styles/theme';
import closeIcon from '@/assets/images/ic_admin_close.svg';
import Modal from 'react-modal';
import { styled } from 'styled-components';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const ModalContainer = styled.div`
  font-family: ${theme.font.regular};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 4;
`;

const Title = styled.div`
  font-family: ${theme.font.regular};
  color: #000;
  font-weight: 700;
  font-size: 24px;
  padding-left: 20px;
`;

const TitleContainer = styled.div`
  background-color: #f2f9f8;
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
`;

const Footer = styled.div`
  background-color: ${theme.color.main};
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: relative;
  bottom: 0;
  flex-shrink: 0;
`;

const CloseIcon = styled.img`
  cursor: pointer;
  margin-right: 20px;
`;

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        content: {
          top: '35%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: '8px',
          width: '50%',
          height: 'auto',
          maxWidth: '830px',
          maxHeight: '90vh',
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <ModalContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <CloseIcon src={closeIcon} alt="close" onClick={onClose} />
        </TitleContainer>
        <MainContent>{children}</MainContent>
        <Footer>{footer}</Footer>
      </ModalContainer>
    </Modal>
  );
};

export default CommonModal;
