import React from "react";
import HeroHome from "./HeroHome";
import styled from "styled-components";
import MainRecommendations from "../Recommendations/MainRecommendations";
import VideoRecommendations from "../Recommendations/VideoRecommendations";
import { MainRecommendationConfig, VideoRecommendationConfig } from "../../config/HomeConfig";
import Avatar from "@mui/material/Avatar/Avatar";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { useContext } from "react";
import { ToolsConfig } from "../../config/HomeConfig";
import SideRecommendation from "../Recommendations/SideRecommendation";
import { keyframes } from "styled-components";

const HomePage: React.FC = () => {
    const { profileSelected, ContextData } = useContext(CustomContextContext);
    const FilteredProfileContext = ContextData.filter((item: any) => item.name === profileSelected);

    const [name, role, dept, source] = FilteredProfileContext[0].people_worked_with;
    const [docname, doctype, docdate, docimg] = FilteredProfileContext[0].files;

    return (
        <>
            <MainWrapper>
                <LeftSection>
                    <Container>
                        <HeroHome />
                        {Object.keys(MainRecommendationConfig).length !== 0 && MainRecommendationConfig.active && <MainRecommendations />}
                        {Object.keys(VideoRecommendationConfig).length !== 0 && VideoRecommendationConfig.active && <VideoRecommendations />}
                    </Container>
                </LeftSection>
                <RightSection>
                    <SectionTitle>Trending Topics</SectionTitle>
                    <SideRecommendation />
                    <SectionTitle>People You Worked With</SectionTitle>
                    <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
                        <div>
                            <Avatar
                                alt="image"
                                src={source}
                                style={{ width: 60, height: 60, marginBottom: '20px' }}
                            />
                        </div>
                        <div style={{ paddingLeft: '10px', paddingTop: '5px' }}>
                            <h5>{name}</h5>
                            <p style={{ fontSize: '11px' }}>{role}</p>
                            <p style={{ fontSize: '11px' }}>{dept}</p>
                        </div>
                    </div>
                    <SectionTitle>Relevant Files</SectionTitle>
                    <div style={{ display: 'flex', marginTop: '10px', marginBottom: '20px', alignItems: "center"}}>
                        <div style={{width: '36px', height: '36px'}}>
                            {FilteredProfileContext[0].name !== 'Anonymous' && <img src={docimg} alt="Document" style={{ width: '100%'}} />}
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <p style={{ fontWeight: '400', fontSize: '15px' }}>{docname}</p>
                            <p style={{ float: 'left', 
                                        backgroundColor: '#f5f5f5', 
                                        color: '#777777', 
                                        margin: '4px 8px 4px 0px', 
                                        borderRadius: '4px',
                                        fontSize: '15px',
                                        padding: '0 5px ' }}>{doctype} </p>
                            <p style={{ float: 'left', paddingLeft: '10px', color: '#777777', margin: '4px 8px 4px 0px', fontSize: '15px' }}>{docdate}</p>
                        </div>

                    </div>
                    <SectionTitle>Tools</SectionTitle>
                    {ToolsConfig.map((tool, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', marginBottom: '10px', marginTop: '10px', alignItems: "center" }}>
                                <img src={tool.image} alt="Tools" style={{ width: '35px', height: '35px' }} />
                                <span style={{ marginLeft: '15px' }}>
                                    <h4 style={{fontSize: '16px'}}>{tool.title}</h4>
                                    <p style={{ fontSize: '12px' }}>{tool.desc}</p>
                                </span>
                            </div>
                        )
                    })}
                </RightSection>
            </MainWrapper>
        </>
    );
};

const slideIn = keyframes`
0% {
  transform: translateX(300px);
}
100% {
  transform: translateX(0);
}
`

const MainWrapper = styled.div`
width: 100%;
display: flex;
position: relative;
-webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
`;

const LeftSection = styled.div`
    padding: 24px;
   flex: 1; 
`;

const RightSection = styled.div`
    overflow: hidden;
    border-left: #e5e8e8 1px solid;
    justify-content: center;
    align-items: center;
    padding: 20px;
    min-width: 350px;
    width: 20%;
`

const SectionTitle = styled.h2`
    font-size: 22px;
`;


export default HomePage;
