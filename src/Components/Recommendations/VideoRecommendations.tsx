import { useEffect, useState, FunctionComponent, useContext } from "react";
import {
  RecommendationList as HeadlessRecommendationList,
  loadClickAnalyticsActions,
  Result,
  buildRecommendationEngine,
  buildRecommendationList,
  getOrganizationEndpoints
} from "@coveo/headless/recommendation";
import { Theme } from "../../theme";
import styled from "styled-components";
import RecommendtionCard, { SkeletonRecommendtionCard } from "./VideoRecommendationCard";

import Coveo from '../../assets/Logo/CoveoSmall.svg';

import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { VideoRecommendationConfig } from "../../config/HomeConfig";
import youtube from "../../assets/ToolIcons/youtube.png";
import EngineContext from "../../common/engineContext";
import { getSearchToken } from "../../common/Engine";

interface RecommendationListProps {
  controller: HeadlessRecommendationList;
  engine: any;
}

export const RecommendationListRenderer: FunctionComponent<
  RecommendationListProps
> = (props) => {
  const engine = props.engine;
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.refresh();
    controller.subscribe(() => setState(controller.state))
  }, []);


  if (state.error) {
    return (
      <div>
        <div>Oops {state.error.message}</div>
        <code>{JSON.stringify(state.error)}</code>
        <button onClick={() => controller.refresh()}>Try again</button>
      </div>
    );
  }

  const logClick = (recommendation: Result) => {
    if (!engine) {
      return;
    }
    const { logRecommendationOpen } = loadClickAnalyticsActions(engine);
    engine.dispatch(logRecommendationOpen(recommendation));
  };

  const skeletonArray = [1,2,3]
  const NumberOfResult = VideoRecommendationConfig.numberOfResults
  return (
    <MainWrapper>
      <TitleWrapper>
      <Logo src={youtube} />
      <Title>{VideoRecommendationConfig.title}</Title>
      </TitleWrapper>
      {state.recommendations.length > 0 ?
      <CardWrapper>
        {state?.recommendations?.slice(0, NumberOfResult).map((recommendation, index) => {

          const imageURL = recommendation.raw[`${VideoRecommendationConfig.imageField}`] as string;
          const date = recommendation.raw[`date`] as number;

          return (
            <div key = {index}>
            <RecommendtionCard
              title={recommendation.title}
              date={date}
              description={recommendation.excerpt}
              image={imageURL? imageURL: Coveo}
              clickUri={recommendation.clickUri} 
              onClick={() => logClick(recommendation)}
              onContextMenu={() => logClick(recommendation)}
              onMouseDown={() => logClick(recommendation)}
              onMouseUp={() => logClick(recommendation)}
            />
            </div>
          );
        })}
      </CardWrapper> : <CardWrapper>
        {skeletonArray.map((item) => {
          return (
              <SkeletonRecommendtionCard key={item}/>
          );
        })}
      </CardWrapper> }
    </MainWrapper>
  );

};

const VideoRecommendation = () => {

  const Engine = useContext(EngineContext)!;

  const [token, setToken] = useState('');
  const { settingContextFromEngine } = useContext(CustomContextContext);
  useEffect(()=>{
    (async ()=>{
      setToken(await getSearchToken())
    })()
  },[])



  if(!token) return null;


  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: token,
      searchHub: VideoRecommendationConfig.searchHub,
      pipeline: VideoRecommendationConfig.pipeline,
      organizationEndpoints : getOrganizationEndpoints(process.env.REACT_APP_ORGANIZATION_ID!),
    },
  });

  settingContextFromEngine(recommendationEngine);

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: VideoRecommendationConfig.id },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
    />
  );
};

export default VideoRecommendation;

const MainWrapper = styled.div`
  margin-top: 54px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  margin-left: 8px;
`;

const Logo = styled.img`
  height: 24px; 
  margin-bottom: 3px;
`

const Title = styled.h2`
font-weight: 500;
margin-left: 15px;
font-size: 26px;
line-height: 32px;
color: ${Theme.primaryText}; 
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;
