import Modal from 'react-modal';
import theme from '@/styles/theme';
import { styled } from 'styled-components';
import closeIcon from '@/assets/images/ic_admin_close.svg';
import { CloseIcon } from './CommonModal';

interface CommonCardinalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  overlayColor?: string;
  showCloseButton?: boolean;
  position: 'center' | 'absolute' | 'fixed';
  borderBottom?: boolean;
}

const StyledModalOverlay = styled.div<{ overlayColor?: string }>`
  background-color: ${(props) => props.overlayColor || 'rgba(0,0,0,0.5)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.font.semiBold};
  color: #000;
`;

const StyledModalContent = styled.div<{
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  position?: string;
}>`
  width: ${(props) => props.width || '500px'};
  height: ${(props) => props.height || 'auto'};
  position: fixed;
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left || '50%'};
  transform: ${(props) =>
    props.top && props.left ? 'none' : 'translate(-50%, -50%)'};
  border-radius: 8px;
  background-color: ${theme.color.gray[100]};
  padding: 0;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div<{ borderBottom?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: ${(props) =>
    props.borderBottom ? '1px solid #dedede' : 'none'};
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

const MainContent = styled.div<{ borderBottom?: boolean }>`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  overflow: hidden;
  border-bottom: ${(props) =>
    props.borderBottom ? '1px solid #dedede' : 'none'};
`;

const Footer = styled.div`
  background-color: ${theme.color.gray[100]};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  bottom: 0;
`;

const CommonCardinalModal: React.FC<CommonCardinalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = '500px',
  height = 'auto',
  top = '50%',
  left = '50%',
  overlayColor = 'rgba(0,0,0,0.5)',
  showCloseButton = true,
  position = 'center',
  borderBottom = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'transparent' },
        content: { inset: 'unset' },
      }}
    >
      <StyledModalOverlay overlayColor={overlayColor}>
        <StyledModalContent
          width={width}
          height={height}
          top={top}
          left={left}
          position={position}
        >
          <ModalContainer>
            <TitleContainer borderBottom={borderBottom}>
              <TitleText>{title}</TitleText>
              {showCloseButton && (
                <CloseIcon src={closeIcon} alt="close" onClick={onClose} />
              )}
            </TitleContainer>
            <MainContent borderBottom={borderBottom}>{children}</MainContent>
            <Footer>{footer}</Footer>
          </ModalContainer>
        </StyledModalContent>
      </StyledModalOverlay>
    </Modal>
  );
};

export default CommonCardinalModal;
