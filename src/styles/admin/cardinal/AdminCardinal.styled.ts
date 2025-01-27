import theme from '@/styles/theme';
import { styled } from 'styled-components';

// CommonCardinalModal.tsx
export const StyledModalOverlay = styled.div<{ overlayColor?: string }>`
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

export const StyledModalContent = styled.div<{
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

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div<{ borderBottom?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: ${(props) =>
    props.borderBottom ? '1px solid #dedede' : 'none'};
`;

export const TitleText = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

export const MainContent = styled.div<{ borderBottom?: boolean }>`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  overflow: hidden;
  border-bottom: ${(props) =>
    props.borderBottom ? '1px solid #dedede' : 'none'};
`;

export const Footer = styled.div`
  background-color: ${theme.color.gray[100]};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  bottom: 0;
`;

// CardinalEditModal.tsx
export const ModalContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
  width: calc(100% - 40px);
  max-width: 360px;
  z-index: 1000;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: ${theme.color.negative};
  font-size: 14px;
`;

export const StyledInput = styled.input<{ flex: number; maxWidth: string }>`
  flex: ${({ flex }) => flex};
  max-width: ${({ maxWidth }) => maxWidth};
  font-family: ${theme.font.semiBold};
  border: 1px solid #dedede;
  border-radius: 4px;
  font-size: 16px;
  padding: 12px;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }
`;

// CardinalModal.tsx
export const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  outline: none;
  text-align: right;

  :focus::placeholder {
    color: transparent;
  }
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #000;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 20px;
`;

export const SvgText = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;
