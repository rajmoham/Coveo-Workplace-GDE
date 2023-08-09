import React, { useContext } from "react";
import { Theme } from '../../theme';
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Avatar } from "@mui/material";
import { 
  fileO,
  fileText,
  star,
  user,
  laptop,
 } from 'react-icons-kit/fa'

import { HeaderConfig } from "../../config/HomeConfig";
import { CustomContextContext } from "../CustomContext/CustomContextContext";

interface SidePanelProps {
  isMinimised: boolean,
}

const SidePanel: React.FC<SidePanelProps> = ({ isMinimised }) => {
  const year = new Date().getFullYear();

  const { profileSelected, ContextData } = useContext(CustomContextContext)
  const FilteredProfileContext = ContextData.filter((item: any) => item.name === profileSelected)[0];

  const ProfileName = FilteredProfileContext.name;
  const ProfilePic = FilteredProfileContext.profile;
  const ProfileRole = FilteredProfileContext.role;
  const Department = FilteredProfileContext.department;
  const Location = FilteredProfileContext.location;
  const YearsOfService = FilteredProfileContext.years_of_service;

  return (
    <>
      <div>
        <ProfileWrapper>
          <Avatar
            alt="Profile Picture"
            src={ProfilePic}
            sx={{
              width: `${isMinimised ? "60px" : "100px"}`,
              height: `${isMinimised ? 60 : 100}px`,
              marginBottom: "20px",
            }}
          />
          <ProfileData>{ProfileName}</ProfileData>
          <p style={{ fontSize: '14px', marginBottom: `${isMinimised ? "98px" : "28px"}` }}>{ProfileRole}</p>
          {
            !isMinimised &&
            <>
              <h5>{Department}</h5>
              <ProfileData>{Location}</ProfileData>
              {YearsOfService
                &&
                <ProfileData>Joined {YearsOfService} years ago</ProfileData>
              }
            </>
          }
        </ProfileWrapper>
        <LinkWrapper>
          {HeaderConfig.map((item, index) => {
            return (
              <SidePanelNavLink 
                key={index} 
                text={item.title} 
                icon={item.image} 
                redirect={item.redirectTo} 
                isMinimised={isMinimised} />
            );
          })}
          <Divider />
          <SidePanelNavLink text="Relevant Files" icon={fileO} isMinimised={isMinimised} />
          <SidePanelNavLink text="Documentation" icon={fileText} isMinimised={isMinimised} />
          <Divider />
          <SidePanelNavLink text="New Features" icon={star} isMinimised={isMinimised} />
          <SidePanelNavLink text="New People" icon={user} isMinimised={isMinimised} />
          <SidePanelNavLink text="Tools" icon={laptop} isMinimised={isMinimised} />
        </LinkWrapper>
      </div>
      {
        !isMinimised
        &&
        <CopyRight>© {year} Coveo Solutions Inc. All Rights Reserved</CopyRight>
      }
    </>
  )
};

interface SidePanelNavLinksProps {
  text: string,
  icon: any,
  redirect?: string,
  isMinimised: boolean,
}

const SidePanelNavLink: React.FC<SidePanelNavLinksProps> = (props: SidePanelNavLinksProps) => {
  const { text, icon, redirect = '#', isMinimised } = props;

  return (
    <NavigationLink href={redirect}>
      <NavWrapper style={{justifyContent: `${isMinimised ? "center" : "flex-start"}`}}>
        <Icon size={22} icon={icon} />
        {!isMinimised
          &&
          <Text>{text}</Text>
        }
      </NavWrapper>
    </NavigationLink>
  )
}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 22px 16px;
  height: 320px;
`;

const LinkWrapper = styled.div`
padding: 22px 16px;
 width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 margin-bottom: 20px;
`

const ProfileData = styled.p`
color: #181d3a;
font-weight: 700;
font-size: 17px;
margin-bottom: 4px;
`

const Divider = styled.div`
  height: 1px;
  width: 80%;
  margin: 16px auto;
  background-color: #ddd;
`;

const NavigationLink = styled.a`
  color: #777;
  text-rendering: optimizeLegibility;
  text-decoration: none;
  font-size: 16px;
  font-weight: 300;
  transition: 0.2s ease-in-out all;
  width: 75%;
  margin: 4px 0;

  &:hover {
    color: #333;
  }
`

const NavWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
text-overflow: none;
font-size: 15px;
padding: 8px 12px;
border-radius: 8px;
`

const Text = styled.p`
  margin-left: 20px;
  font-size: 16px;
  text-align: center;
`

const CopyRight = styled.span`
display: block;
text-align: center;
color: #888888;
font-size: 12px;
font-weight: 600;
margin: 8px 16px;
`


export default SidePanel;