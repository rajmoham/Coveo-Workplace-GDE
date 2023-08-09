import { useEffect, useState, FunctionComponent, useContext } from "react";
import {
  RecommendationList as HeadlessRecommendationList,
  loadClickAnalyticsActions,
  Result,
  buildRecommendationEngine,
  buildRecommendationList,
} from "@coveo/headless/recommendation";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { MainRecommendationConfig } from "../../config/HomeConfig";
import EngineContext from "../../common/engineContext";
import { getSearchToken } from "../../common/Engine";
var _ = require('lodash');

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
  }, [controller]);

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

  const NumberOfResult = MainRecommendationConfig.numberOfResults;
  return (
    <MainWrapper>
      {state.recommendations.length > 0 ? (
        <CardWrapper>
          {state?.recommendations?.slice(0, NumberOfResult).map((recommendation, index) => {
              const concepts: unknown = recommendation.raw[`${MainRecommendationConfig.concept}`]
              let word = _.sample(concepts);

              return (
                <TextWrapper
                  key={index}
                  onClick={() => {
                    logClick(recommendation);
                    window.open(`#`, "_self", "noopener,noreferrer");
                  }}
                  onContextMenu={() => { logClick(recommendation) }}>
                  <span style={{ textTransform: "capitalize", fontSize: '15px' }}>{word}</span>
                </TextWrapper>
              );
            })}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {Array(3).fill("").map((_, index) => {
            return (  
                <TextWrapper key={index}>
                  <Skeleton style={{ width: "120px" }} />
                </TextWrapper>
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
      platformUrl: process.env.REACT_APP_PLATFORM_URL
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
  width: 95%;
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  margin-bottom: 30px;
`;

const TextWrapper = styled.div`
margin-bottom: 10px;
transition: transform .2s;
padding: 2px 4px;
overflow: hidden;
margin-right: 28px;
border-radius: 6px;
border: 1px solid #e9e9e9;
cursor: pointer;
&:hover {
  box-shadow: 0 0 3px #9d9d9d;
}
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 50%;
  align-items: center;
  justify-content: flex-start;
  max-width: 1250px;
  margin-top: 20px;
`;
