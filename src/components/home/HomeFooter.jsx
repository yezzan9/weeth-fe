import React, { useRef } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useDraggable } from '../../hooks/useDraggable';
import leets from '../../assets/images/ic_leets.svg';
import insta from '../../assets/images/ic_insta.svg';
import discord from '../../assets/images/ic_discord.svg';
import github from '../../assets/images/ic_github.svg';
import gradu from '../../assets/images/ic_gradu.svg';
import commitato from '../../assets/images/ic_commitato.svg';
import moodmate from '../../assets/images/ic_moodmate.svg';
import filling from '../../assets/images/ic_filling.svg';
import weeth from '../../assets/images/ic_weeth.svg';

const StyledHomeFooter = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  width: 86.8%;
  margin: 8% 6.6% 0px 6.6%;
`;

const ScrollContainer = styled.div`
  display: flex;
  width: 94%;
  margin: 4% 3% 0px 3%;
  overflow-x: auto;
  cursor: grab;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
  }
`;

const ImgContainer = styled.div`
  margin-bottom: 5px;
`;

const GridItem = styled.a`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 10px 15px 15px 0;
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_semiBold};
  width: 34%;
  height: 77px;
  color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 16px;
  white-space: nowrap;
  text-decoration: none;
  &:last-child {
    margin-right: 0;
  }
`;

const GridItemWithImage = styled(GridItem)`
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  border: none;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  padding: 10px;
  font-family: ${theme.font.family.pretendard_semiBold};
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.9)
    );
    z-index: 1;
  }
  span {
    position: relative;
    z-index: 2;
    color: #fff;
    font-size: 16px;
  }
`;

const HomeFooter = () => {
  const scrollerRef1 = useRef(null);
  const scrollerRef2 = useRef(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef1);
  const draggableHandlers2 = useDraggable(scrollerRef2);

  return (
    <>
      <StyledHomeFooter>From Leets</StyledHomeFooter>
      <ScrollContainer
        ref={scrollerRef1}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <GridItem href="https://www.leets.land/" target="_blank">
          <ImgContainer>
            <img src={leets} alt="leets" />
          </ImgContainer>
          홈페이지
        </GridItem>
        <GridItem
          href="https://www.instagram.com/leets.official/"
          target="_blank"
        >
          <ImgContainer>
            <img src={insta} alt="instagram" />
          </ImgContainer>
          Instagram
        </GridItem>
        <GridItem href="https://discord.gg/XvZqeAca4K" target="_blank">
          <ImgContainer>
            <img src={discord} alt="discord" />
          </ImgContainer>
          Discord
        </GridItem>
        <GridItem href="https://github.com/Leets-Official" target="_blank">
          <ImgContainer>
            <img src={github} alt="github" />
          </ImgContainer>
          Github
        </GridItem>
      </ScrollContainer>
      <StyledHomeFooter>Leets의 프로젝트를 둘러보세요!</StyledHomeFooter>
      <ScrollContainer
        ref={scrollerRef2}
        onMouseDown={draggableHandlers2.onMouseDown}
        onMouseMove={draggableHandlers2.onMouseMove}
        onMouseUp={draggableHandlers2.onMouseUp}
        onMouseLeave={draggableHandlers2.onMouseLeave}
      >
        <GridItemWithImage
          image={weeth}
          href="https://www.leets.land/project/12"
          target="_blank"
        >
          <span>Weeth</span>
        </GridItemWithImage>
        <GridItemWithImage
          image={commitato}
          href="https://www.leets.land/project/13"
          target="_blank"
        >
          <span>COMMITATO</span>
        </GridItemWithImage>
        <GridItemWithImage
          image={moodmate}
          href="https://www.leets.land/project/7"
          target="_blank"
        >
          <span>moodmate</span>
        </GridItemWithImage>
        <GridItemWithImage
          image={filling}
          href="https://www.leets.land/project/8"
          target="_blank"
        >
          <span>filling</span>
        </GridItemWithImage>
        <GridItemWithImage
          image={gradu}
          href="https://www.leets.land/project/10"
          target="_blank"
        >
          <span>Gradu</span>
        </GridItemWithImage>
      </ScrollContainer>
    </>
  );
};

export default HomeFooter;
