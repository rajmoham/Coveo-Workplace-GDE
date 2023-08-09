import React, { useContext, useState } from "react";
import styled from "styled-components";

import { Theme } from '../../theme';
import { HeroConfig } from '../../config/HomeConfig';
import { CustomContextContext } from "../CustomContext/CustomContextContext";

/* import Jira from '../../assets/jira_logo.png'; */
import Jira from '../../assets/jira_logo.png'
import Icon from "react-icons-kit";

const HeroHome: React.FC = () => {
    const { profileSelected, ContextData, } = useContext(CustomContextContext);
    const FilteredProfileContext = ContextData.filter((item: any) => item.name === profileSelected)
    const tasks = FilteredProfileContext[0].tasks;

    const time = new Date();

    const TimeOfDay = (time: Date) => {
        const hour = time.getHours();
        if (hour > 5 && hour <= 12) {
            return 'Morning'
        }
        else if (hour > 12 && hour <= 18) {
            return 'Afternoon'
        }
        else if (hour > 18 && hour <= 22) {
            return 'Evening'
        }
        return 'Night'
    }

    // For region parameter, use:'https://www.techonthenet.com/js/language_tags.php'
    // Look at DateInDifferentLanguageProps for the available values in options
    const dateString = DateInDifferentLanguage(
        'gb-GB',
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });


    return (
        <Wrapper>
            <DateToday>
                <span style={{ fontSize: '14px' }}>{dateString}</span>
            </DateToday>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <Icon icon={HeroConfig.titleIcon} size={34} style={{ marginTop: '3px' }} />
                <Title>
                    {`Good ${TimeOfDay(time)} ${FilteredProfileContext[0].name.split(" ", 2)[0]}!`}
                </Title>
            </div>
            <SubTitle>{HeroConfig.subtitle}</SubTitle>
            {
                tasks.map((taskObj: any, index: number) => {
                    return (<TaskCard key={index} taskSource={taskObj.sourceImg} taskInfo={taskObj.task} />)
                })
            }

        </Wrapper>
    )
};

interface TaskCardProps {
    taskInfo: string,
    taskSource: string
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const [taskComplete, setTaskComplete] = useState(false);
    const { taskInfo, taskSource } = props;

    return (
        <Button
            onClick={() => { setTaskComplete(!taskComplete) }}
            style={{ opacity: taskComplete ? 0.4 : 1 }}>
            <img src={taskSource} alt="Task Source" style={{ width: '25px', height: '20px', marginRight: "12px" }} />
            <Sub>{taskInfo}</Sub>
        </Button>
    )
}

const Wrapper = styled.div`
font-family: inherit;
display: block;
`

const DateToday = styled.div`
color: ${Theme.primary};
margin-bottom: 16px;
`

const Title = styled.h1`
font-size: ${HeroConfig.titleFontSize};
font-weight: ${HeroConfig.titleFontWeight};
margin-left: 15px;
color: ${Theme.primaryText}; 
`

const SubTitle = styled.p`
font-weight: 300;
font-size: 18px;
line-height: 18px;
color:  ${Theme.primaryText};
margin-bottom: 16px;
`

const Button = styled.button`
display: flex;
align-items: center;
padding: 8px 20px;
margin-bottom: 8px;
background-color: ${Theme.primary};
border-radius: 8px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 14px;
border: none;
cursor: pointer;
transition: 0.2s ease-in-out;
&:hover {
    filter: brightness(0.7);
}
`

const Sub = styled.span`
font-weight: 300;
font-size: 14px;
color:  white;
position: relative;
`;

interface DateOptions {
    weekday: "long" | "short" | "narrow",
    day: "numeric" | "2-digit",
    month: "numeric" | "2-digit" | "long" | "short" | "narrow",
    year: "numeric" | "2-digit",
}

const DateInDifferentLanguage = (region: string, options: DateOptions) => {
    const date = new Date();
    const date_str = date.toLocaleDateString(region, options);

    return date_str
}


export default HeroHome;