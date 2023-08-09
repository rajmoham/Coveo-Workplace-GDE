import React from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { Icon } from "react-icons-kit";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface RecommendationCardType {
  title: string;
  description: string;
  date: number;
  image: string;
  video?: boolean;
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
  video = true,
  clickUri,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  source = "",
}) => {

  const newdate = new Date(Number(date));

  return (
    <MainWrapper
      key={title}
      onClick={() => {
        onClick();
        window.open(clickUri, "_blank", "noopener,noreferrer");
      }}
      onContextMenu={onContextMenu}
    /* onMouseDown = {onMouseDown}
      onMouseUp = {onMouseUp} */
    >
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <TextWrapper>
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
        <ReferralLink>
          {!video ? "Learn more" : "Watch now"}{" "}
          <IconWrapper>
            <Icon icon={chevronRight} />
          </IconWrapper>
        </ReferralLink>
      </TextWrapper>
    </MainWrapper>
  );
};

export const SkeletonRecommendtionCard: React.FC = () => {
  return (
    <MainWrapper>
      <Skeleton style={{ height: "170px", top: "-5px" }} />
      <div style={{ padding: "15px 20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Skeleton count={2} style={{ height: "20px" }} />
        </div>
        <div style={{marginBottom: "28px"}}>
        <Skeleton count={3} style={{ height: "13px"}} />
        </div>
        <Skeleton count={1} style={{height: "13px", width: "120px"}}/>
      </div>
    </MainWrapper>
  );
};

const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  transition: 0.2s ease-in-out all;
`;
const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 220px;
  align-items: center;
  justify-content: space-around;
  padding: 10px 20px;
  flex-direction: column;
`;

const Title = styled.a`
  color: ${Theme.primaryText};
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

const ReferralLink = styled.a`
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${Theme.primary};
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  opacity: 0.8;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  margin-left: 8px;
  color: ${Theme.primary};
  transition: .2s ease all;
`;

const MainWrapper = styled.div`
  width: 300px;
  margin-right: 28px;
  margin-bottom: 28px;
  transition: all .2s ease;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid #e9e9e9;
  cursor: pointer;
  &:hover{
    box-shadow: 0 0 3px #9d9d9d;     
    ${Image} {
      scale: 1.02;
    }
    ${Title} {
      color: ${Theme.primary}
    }
    ${IconWrapper} {
      margin-left: 12px;
    }
    ${ReferralLink} {
      opacity: 1;
    }
  }
`;

export default RecommendtionCard;
