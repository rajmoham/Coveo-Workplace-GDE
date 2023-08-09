import React, { useContext } from "react";
import { Theme } from "../../theme";
import SearchSideBarRecommendationList from "./SearchSideBarRecommendationList";
import { useParams } from "react-router-dom";
import SearchTabs from "./SearchTabs";
import {
  DefaultSideBarRecommendationConfig,
  EnableRecentQueries,
  EnableRecentResultList,
  SearchPageTabConfig,
  FacetConfig
} from "../../config/SearchConfig";
import styled, { keyframes } from "styled-components";
import MyResultTemplateFunction from "../../config/ResultTemplate";
import { AtomicResultList } from "@coveo/atomic-react";
import RedirectionTrigger from "./RedirectionTrigger";
import NotifyTrigger from "./NotifyTrigger";
import EngineContext from "../../common/engineContext";
import { QuickViewModalContext } from "./QuickViewModalContext";
import { RecentQueriesList } from "./RecentQueriesList";
import { RecentResultsList } from "./RecentResultsList";

const SearchPage = (props) => {
  const { filter } = useParams();
  const Engine = useContext(EngineContext);
  const QuickViewObj = useContext(QuickViewModalContext);

  const isRouteMatching = (param, caption) => {

    if (!param && caption === SearchPageTabConfig[0].caption) {
      return true;
    }
    return param &&
      caption.replace(/\s/g, "").toLowerCase() === param.toLowerCase()
      ? true
      : false;
  };

  const selectedTab = SearchPageTabConfig.filter((tab) => {
    return isRouteMatching(filter, tab.caption)
  })[0];

  const showCategoryFacet = selectedTab.categoryFacet;
  const facetsList = selectedTab.facetToInclude;

  /*   var facetsConfig = FacetConfig.slice(0, FacetConfig.length);
    
    function getFacetTitle(facet) {
  
    } */


  return (
    <>
      <Wrapper>
        <SearchTabs filterSelected={filter ? filter : ""} />
        <SearchInterfaceContainer>
          <AtomicSearchWrapper>
            <RedirectionTrigger />
            <NotifyTrigger />
            <atomic-search-layout>
              <style>{AtomicTheme}</style>
              <atomic-layout-section section="facets" max-width="280px">
                {
                  showCategoryFacet
                  &&
                  <atomic-category-facet
                    field="custurlnav"
                    label="Category"
                    field-id="CategoryFacet"
                    heading-level="3"
                    sort-criteria="occurrences"
                    delimiting-character="|"
                    with-search={true}
                    facet-id={"custurlnav"}
                  ></atomic-category-facet>
                }
                <atomic-facet-manager>
{/*                   {
                    facetsList.map((facet) => {
                      return (
                        <atomic-facet
                          field={facet}
                          label={facet}
                          facet-id={facet}
                        ></atomic-facet>
                      )
                    })
                  } */}

                  <atomic-facet
                    field="concepts"
                    label="Concepts"
                    facet-id={"concepts"}
                  ></atomic-facet>
                   <atomic-facet
                    field="author"
                    label="Authors"
                    facet-id={"author"}
                  ></atomic-facet>
                  <atomic-facet
                    field="source"
                    label="Source"
                    facet-id={"source"}
                  ></atomic-facet>
                  <atomic-facet
                    field="category"
                    label="Platform Solutions"
                    facet-id={"category"}
                  ></atomic-facet>
                </atomic-facet-manager>
              </atomic-layout-section>

              <atomic-layout-section section="main">
                <atomic-layout-section section="status">
                  <atomic-breadbox></atomic-breadbox>
                  <atomic-query-summary></atomic-query-summary>
                  <atomic-refine-toggle></atomic-refine-toggle>

                  <atomic-sort-dropdown>
                    <atomic-sort-expression
                      label="relevance"
                      expression="relevancy"
                    ></atomic-sort-expression>
                    <atomic-sort-expression
                      label="most-recent"
                      expression="date descending"
                    ></atomic-sort-expression>
                  </atomic-sort-dropdown>

                  <atomic-did-you-mean></atomic-did-you-mean>
                </atomic-layout-section>

                <atomic-layout-section section="results">
                  <atomic-smart-snippet></atomic-smart-snippet>
                  <atomic-smart-snippet-suggestions></atomic-smart-snippet-suggestions>
                  <AtomicResultList
                    template={(result) =>
                      MyResultTemplateFunction(result, QuickViewObj)
                    }
                  ></AtomicResultList>
                  <atomic-query-error></atomic-query-error>
                  <atomic-no-results></atomic-no-results>
                </atomic-layout-section>
                <atomic-layout-section section="pagination">
                  <atomic-load-more-results></atomic-load-more-results>
                </atomic-layout-section>
                <atomic-layout-section section="pagination">
                  <atomic-pager></atomic-pager>
                  <atomic-results-per-page></atomic-results-per-page>
                </atomic-layout-section>
              </atomic-layout-section>
            </atomic-search-layout>
          </AtomicSearchWrapper>
          <RecentsBoxContainer>
            <SideBarRecommendation filter={filter} engine={Engine}>
              {EnableRecentQueries && <RecentQueriesList />}
              {EnableRecentResultList && <RecentResultsList />}
            </SideBarRecommendation>
          </RecentsBoxContainer>
        </SearchInterfaceContainer>
      </Wrapper>
    </>
  );
};

export default SearchPage;

export const SideBarRecommendation = ({ filter, engine, children }) => {
  return (
    <>
      {DefaultSideBarRecommendationConfig.length > 0 ? (
        <SideBarRecommendationContainer>
          {children}
          {DefaultSideBarRecommendationConfig.map((item) => {
            return (
              <React.Fragment key={item.title}>
                <SearchSideBarRecommendationList
                  pipeline={item?.pipeline}
                  NumberofResults={item?.NumberofResults}
                  title={item?.title}
                  videoRecommendation={item?.videoRecommendation}
                  imageField={item.imageField}
                  searchHub={item.searchHub}
                />
              </React.Fragment>
            );
          })}
        </SideBarRecommendationContainer>
      ) : (
        <>
          {SearchPageTabConfig.map((tab, index) => {
            const tabHasRecommendation =
              (filter?.toLowerCase() ===
                tab.caption.replace(/\s/g, "").toLowerCase() ||
                (index === 0 && filter === undefined)) &&
              tab.sideBarRecommendationConfig;

            if (tabHasRecommendation) {
              return (
                <React.Fragment key={tab.caption}>
                  <SideBarRecommendationContainer
                    tabHasRecommendation={tabHasRecommendation}
                  >
                    {children}
                    <>
                      {tab.sideBarRecommendationConfig.map((item) => {
                        return (
                          <React.Fragment key={item.title}>
                            <SearchSideBarRecommendationList
                              pipeline={item.pipeline}
                              NumberofResults={item.NumberofResults}
                              title={item.title}
                              videoRecommendation={item.videoRecommendation}
                              imageField={item.imageField}
                              searchHub={item.searchHub}
                            />
                          </React.Fragment>
                        );
                      })}
                    </>
                  </SideBarRecommendationContainer>
                </React.Fragment>
              );
            }
            return null;
          })}
        </>
      )}
    </>
  );
};

const slideIn = keyframes`
0% {
  left: 300px
}
100% {
  left: 0;
}
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 16px;
  position: relative;
  -webkit-animation: ${slideIn} 0.6s forwards;
  -webkit-animation-delay: 2s;
  animation: ${slideIn} 0.6s forwards;
`;

const SearchInterfaceContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const AtomicSearchWrapper = styled.div`
  flex: 3;
  max-width: 1400px;
`;

const SideBarRecommendationContainer = styled.div`
  flex: 1;
  max-width: 300px;
  display: ${(props) => (props.tabHasRecommendation ? "block" : "none")};
  @media (max-width: 768px) {
    display: none;
  }
`;

const RecentsBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
`;

const AtomicTheme = `
:root {
  /* Primary colors */
  --atomic-primary: ${Theme.primary};
  --atomic-primary-light: ${Theme.primary};
  --atomic-primary-dark: #1a50ad;
  --atomic-on-primary: #ffffff;
  --atomic-ring-primary: rgba(19, 114, 236, 0.5);

  /* Neutral colors */
  --atomic-neutral-dark: #626971;
  --atomic-neutral: #e5e8e8;
  --atomic-neutral-light: #f6f7f9;
  --atomic-neutral-lighter: #f2f2f2;

  /* Semantic colors */
  --atomic-background: #ffffff;
  --atomic-on-background: #282829;
  --atomic-success: #12a244;
  --atomic-error: #ce3f00;
  --atomic-visited: #752e9c;
  --atomic-disabled: #c5cacf;
  --atomic-success-background: #d4fcf0;
  --atomic-error-background: #fcbdc0;
  --atomic-primary-background: #edf6ff;

  /* Border radius */
  --atomic-border-radius: 0.25rem;
  --atomic-border-radius-md: 0.5rem;
  --atomic-border-radius-lg: 0.75rem;
  --atomic-border-radius-xl: 1rem;

  /* Font */
  --atomic-font-family: ${Theme.fontFamily}
  --atomic-font-normal: 400;
  --atomic-font-bold: 500;

  /* Text size */
  --atomic-text-base: 0.875rem; /* 14px */
  --atomic-text-sm: 0.75rem; /* 12px */
  --atomic-text-lg: 1rem; /* 16px */
  --atomic-text-xl: 1.125rem; /* 18px */
  --atomic-text-2xl: 1.5rem; /* 24px */
  --atomic-line-height-ratio: 1.5;

  /* Layout */
  --atomic-layout-spacing-x: 1.5rem;
  --atomic-layout-spacing-y: 1rem;
}
`;
