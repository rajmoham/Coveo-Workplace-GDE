import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Theme } from "../../theme";

interface RecommendationCardType {
  title: string;
  description: string;
  date: number;
  image: string;
  clickUri: string;
  onClick: () => void;
  onContextMenu: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  source?: string;
}

const RecommendtionCard: React.FC<RecommendationCardType> = ({
  title,
  description,
  date,
  image,
  clickUri,
  onClick,
  onContextMenu,
/*   onMouseDown,
  onMouseUp */
}) => {

  const newdate = new Date(date);
  const date_str = newdate.toLocaleDateString("en-GB", { day: 'numeric', month: '2-digit', year: "numeric"  });

  return (
    <MainWrapper
      onClick={() => {
        onClick();
        window.open(clickUri, "_blank", "noopener,noreferrer");
      }}
      onContextMenu={onContextMenu}
/*       onMouseDown = {onMouseDown}
      onMouseUp = {onMouseUp} */
    >
      <Image src={image} />
      <TextWrapper>
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
        <DateText>
          {date_str}
        </DateText>
      </TextWrapper>
    </MainWrapper>
  );
};

export const SkeletonRecommendtionCard: React.FC = () => {
  return (
    <MainWrapper>
      <Skeleton count={1} style={{ marginBottom: "16px", height: "60px", width: "60px" }} />
      <div style={{marginBottom: "20px"}}>
        <Skeleton count={2} style={{ height: "20px" }} />
      </div>
      <Skeleton count={3} style={{ height: "10px", marginBottom: "0" }} />
    </MainWrapper>
  );
};

const Image = styled.img`
object-fit: contain;
object-position: center center;
height: 60px;
transition: 0.2s ease-in-out all;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 16px 0;
`;

const Title = styled.a`
  color: ${Theme.primaryText};
  text-transform: capitalize;
  text-rendering: optimizeLegibility;
  font-style: normal;
  align-self: flex-start;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 18px;
`;

const SubTitle = styled.span`
text-rendering: optimizeLegibility;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${Theme.primaryText};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`;

const DateText = styled.p`
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-top: 10px;
  color: #242424;
  display: flex;
  align-self: flex-start;
`;

const MainWrapper = styled.div`
width: 300px;
height: 285px;
margin-right: 28px;
margin-bottom: 28px;
transition: all .2s ease;
padding: 20px;
overflow: hidden;
border-radius: 10px;
border: 2px solid #e9e9e9;
cursor: pointer;
&:hover{
  box-shadow: 0 0 3px #9d9d9d;
  ${Title} {
    color: ${Theme.primary}
  }
}
`;

export default RecommendtionCard;
