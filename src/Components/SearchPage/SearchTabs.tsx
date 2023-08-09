import React, { useContext } from "react";
import { buildTab, Tab } from "@coveo/headless";
import EngineContext from "../../common/engineContext";
import styled from "styled-components";
import { Theme } from "../../theme";
import {  useNavigate } from "react-router-dom";
import { SearchPageTabConfig } from "../../config/SearchConfig";
import { SearchPageTabConfigType } from "../../config/Types/ConfigTypes";

const isRouteMatching = (param: string, caption: string) => {

  if (!param && caption === SearchPageTabConfig[0].caption) {
    return true;
  }
  return param &&
    caption.replace(/\s/g, "").toLowerCase() === param.toLowerCase()
    ? true
    : false;
};

interface SearchTabType {
  item: SearchPageTabConfigType;
  controller: Tab;
  selected: boolean;
}

export const SearchTab: React.FC<SearchTabType> = ({
  controller,
  item,
  selected,
}) => {
  const navigate = useNavigate();

/*   useEffect(() => {
    if (selected) {
      controller.select();
    }
  }, []); */

  return (
    <TabTitle
      key={item.caption}
      onClick={() => {
        navigate(`/search/${item.caption.replace(/\s/g, "")}`);
        if (!selected) {
          controller.select();
        }
      }}
      isActive={selected}
    >
      {item.caption}
    </TabTitle>
  );
};

interface SearchTabsType {
  filterSelected: string;
}

const SearchTabs: React.FC<SearchTabsType> = ({ filterSelected }) => {
  const engine = useContext(EngineContext)!;
/* const searchParams = new URLSearchParams(search);
const param = searchParams.get("param"); */
  return (
    <Wrapper>
      {SearchPageTabConfig.map((item) => {
        const controller = buildTab(engine, {
          options: {
            id: item.caption,
            expression: item.expression,
          },
        });

        return (
          <React.Fragment key={item.caption}>
            <SearchTab
              item={item}
              controller={controller}
              selected={isRouteMatching(filterSelected, item.caption)}
            ></SearchTab>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  flex-wrap: wrap;
  margin-left: 18px;
`;

const TabTitle = styled.button<{ isActive: boolean }>`
  margin: 6px 6px;
  padding: 20px;
  font-size: 13px;
  height: 13px;
  font-weight: 500;
  border-radius: 4px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  color: ${(props) => (props.isActive ? 'white' : `${Theme.primary}` )};
  background: ${(props) => (props.isActive ? `${Theme.primary}` : null)};
  transition: 0.2s ease-in-out all;
  &:hover {
    background: ${(props) => (!props.isActive && `${Theme.primary}55`)};
  }
`;

export default SearchTabs;

// cursor: pointer;
// font-family: inherit;
// padding: 15px 20px;
// text-align: center;
