import react, { useState } from 'react'
import Header from "./Header";
import SidePanel from "./SidePanel";
import { Outlet } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import { MINIMISED_SIDEPANEL_WIDTH, EXPANDED_SIDEPANEL_WIDTH, HEADER_HEIGHT } from '../../config/HomeConfig';
import hero from '../../assets/Hero.svg'
const NavBarMenu = () => {

    const [SidePanelWidth, setSidePanelWidth] = useState(EXPANDED_SIDEPANEL_WIDTH);

    const toggleSidePanel = () => {
        if (SidePanelWidth === EXPANDED_SIDEPANEL_WIDTH) {
            setSidePanelWidth(MINIMISED_SIDEPANEL_WIDTH);
        }
        else {
            setSidePanelWidth(EXPANDED_SIDEPANEL_WIDTH);
        }
    }

    return (
        <>
            <Header toggleSidePanel={toggleSidePanel} />
            <SidePanelWrapper style={{ width: `${SidePanelWidth}px` }}>
                <SidePanel isMinimised={SidePanelWidth == MINIMISED_SIDEPANEL_WIDTH} />
            </SidePanelWrapper>
            <Content style={{ width: `calc(100% - ${SidePanelWidth}px)`, left: `${SidePanelWidth}px` }}>
                <Outlet /> {/* Outlet component renders the main content*/}
            </Content>
        </>
    )
}

const slideIn = keyframes`
0% {
  transform: translateX(-100%);
}
100% {
  transform: translateX(0);
}
`

const SidePanelWrapper = styled.div`
left: 0;
top: ${HEADER_HEIGHT}px;
height: calc(100vh - ${HEADER_HEIGHT}px);
position: fixed;
overflow-y: auto;
background: #f6f7f9;
z-index: 9999;
display: flex;
flex-direction: column;
justify-content: space-between;

-webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;
`;

const Content = styled.div`
position: relative;
top: ${HEADER_HEIGHT}px;
right: 0;
transition: .2s ease left, .2s ease width;
display: flex;
justify-content: center;
`;


export default NavBarMenu;