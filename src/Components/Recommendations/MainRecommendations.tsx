import { useEffect, useState, FunctionComponent, useContext } from "react";
import {
  RecommendationList as HeadlessRecommendationList,
  loadClickAnalyticsActions,
  Result,
  buildRecommendationEngine,
  buildRecommendationList,
  getOrganizationEndpoints,
} from "@coveo/headless/recommendation";
import { Theme } from "../../theme";
import styled from "styled-components";
import RecommendtionCard, {
  SkeletonRecommendtionCard,
} from "./RecommendationCard";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { DefaultRecommendationImage, MainRecommendationConfig } from "../../config/HomeConfig";
import EngineContext from "../../common/engineContext";
import { getSearchToken } from "../../common/Engine";
import Icon from "react-icons-kit";
import Coveo from '../../assets/Logo/CoveoSmall.svg'


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
    controller.subscribe(() => setState(controller.state));
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

  const skeletonArray = [1, 2, 3];
  const NumberOfResult = MainRecommendationConfig.numberOfResults;
  return (
    <MainWrapper>
      <TitleWrapper >
        <Icon icon={MainRecommendationConfig.titleIcon} size={28} />
        <Title>{MainRecommendationConfig.title}</Title>
      </TitleWrapper>
      {state.recommendations.length > 0 ? (
        <CardWrapper>
          {state?.recommendations
            ?.slice(0, NumberOfResult)
            .map((recommendation) => {
              /* const imageURL = recommendation.raw[`${MainRecommendationConfig.imageField}`] as string; */
              const imageURL = '';
              const date = recommendation.raw[`date`] as number;

              return (
                <div key={recommendation.title + recommendation.uniqueId}>
                  <RecommendtionCard
                    title={recommendation.title}
                    description={recommendation.excerpt}
                    date={date}
                    image={imageURL ? imageURL : Coveo}
                    clickUri={recommendation.clickUri}
                    onClick={() => logClick(recommendation)}
                    onContextMenu={() => logClick(recommendation)}
                    onMouseDown={() => logClick(recommendation)}
                    onMouseUp={() => logClick(recommendation)}
                  />
                </div>
              );
            })}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {Array(3).fill("").map((_, index) => {
            return (
              <SkeletonRecommendtionCard key={index} />
            );
          })}
        </CardWrapper>
      )}
    </MainWrapper>
  );
};

const MainRecommendationList = () => {



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
      searchHub: MainRecommendationConfig.searchHub,
      pipeline: MainRecommendationConfig.pipeline,
      organizationEndpoints : getOrganizationEndpoints(process.env.REACT_APP_ORGANIZATION_ID!),
    },
  });



  settingContextFromEngine(recommendationEngine);

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: MainRecommendationConfig.id },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
    />
  );
};

export default MainRecommendationList;

const MainWrapper = styled.div`
  margin-top: 54px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const Logo = styled.img`
  height: 32px; 
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

