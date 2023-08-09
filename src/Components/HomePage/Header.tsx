import React, { useContext, useState } from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { keyframes } from 'styled-components'
import { useLocation } from "react-router-dom";

import HomeSearchBox from "./HomeSearchBox";
import SearchBox from "../SearchPage/SearchBox";
import ContextForm from "../CustomContext/ContextForm";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import Popover from "@mui/material/Popover";
import { HeaderLogo, HEADER_HEIGHT } from "../../config/HomeConfig";

import Icon from "react-icons-kit";
import {
  cog as settings,
  bell,
  userCircleO as user,
} from 'react-icons-kit/fa'
import { ic_menu_open as menu } from 'react-icons-kit/md/ic_menu_open'

const ICON_SIZE = 26;
const ICON_COLOR = "#777";

interface HeaderProps {
  toggleSidePanel: Function
}

const Header: React.FC<HeaderProps> = ({ toggleSidePanel }) => {
  const { getProfile } = useContext(CustomContextContext)
  const onSearchPage = window.location.pathname.includes("search");

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const [isMinimised, setIsMinimised] = useState(false);

  return (
    <Wrapper>
      <div style={{ display: 'flex', width: '70%' }}>
        <LeftWrapper>
          <IconContainer
            isMinimised={!isMinimised}
            onClick={() => {
              setIsMinimised(!isMinimised);
              toggleSidePanel();
            }}>
            <Icon icon={menu} size={40} />
          </IconContainer>
          <LogoLink href='/'>
            <Logo src={HeaderLogo} />
          </LogoLink>
        </LeftWrapper>

        <SearchBoxContainer>
          {!onSearchPage
            ?
            <>
              <HomeSearchBox />
            </>
            :
            <SearchBox />
          }
        </SearchBoxContainer>
      </div>
      <RightWrapper>
        <ProfileIconContainer
          aria-describedby={"simple-popover"}
          onClick={(event) => setAnchorEl(event.currentTarget)}>
          <Icon icon={user} size={ICON_SIZE} style={{ color: ICON_COLOR }} />
          <ProfileName>{getProfile().name.split(' ').slice(0, -1).join(' ')}</ProfileName>
        </ProfileIconContainer>
        <Divider />
        <IconWrapper>  <Icon icon={settings} size={ICON_SIZE} />    </IconWrapper>
        <IconWrapper>  <Icon icon={bell} size={ICON_SIZE} />   </IconWrapper>
        <Popover
          id={"simple-popover"}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disableScrollLock
          sx={{ transition: ".2s all ease", backgroundColor: "#00000055" }}>
          <ContextForm />
        </Popover>
      </RightWrapper>

    </Wrapper>
  );
};

const slideIn = keyframes`
0% {
  transform: translateY(-100%);
}
100% {
  transform: translateY(0);
}
`

const Wrapper = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
width: 100vw;
padding: 4px 32px;
left: 0;
position: fixed;
background-color: white;
z-index: 2;
height: ${HEADER_HEIGHT}px;
border-bottom: #e5e8e8 1px solid;

-webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;
`;

const LogoLink = styled.a`
margin-left: 32px;
user-select: none;
`

const IconContainer = styled.div<{ isMinimised: boolean }>`
  color: ${Theme.primary};
  cursor: pointer;
  transform: rotateY(${props => props.isMinimised ? '0deg' : '180deg'});
  transition: .2s ease all;
`;

const Logo = styled.img`
height: 32px;
`

const SearchBoxContainer = styled.div`
flex: 1;
margin-left: 100px;
max-width: 750px;
min-width: 400px;
`;

const RightWrapper = styled.div`
display: flex;
align-items: center;
`
  ;
const LeftWrapper = styled.div`
display: flex;
align-items: center;
`;

const ProfileIconContainer = styled.button`
display: flex;
align-items: center;
flex-direction: row;
background: none;
border: 0px;
border-radius: 4px;
padding:6px 12px;
transition: 0.2s ease-in-out all;
cursor: pointer;
&:hover{
  background-color: #E9E9E9;
}
&:active{
  transform: scale(0.98);
}
`

const ProfileName = styled.span`
font-size  : 14px;
font-weight: 400;
font-family: inherit;
margin-left: 15px;
margin-top: 4px;
color : ${Theme.primaryText};
text-overflow: ellipsis;
`

const Divider = styled.div`
  width: 2px;
  margin: 0 8px;
  height: 30px;
  background-color: #e5e8e8;
  @media (max-width:1000px) {
    display: none;
  }
`;

const IconWrapper = styled.button`
flex-direction: row;
background: none;
border: 0px;
border-radius: 4px;
margin-right: 8px;
padding: 6px;
transition: 0.2s ease-in-out all;
color: ${ICON_COLOR};
cursor: pointer;
&:hover{
  background-color: #E9E9E9;
}
&:active{
  transform: scale(0.95);
}
`

export default Header;
