import RecommendationDefault from "../assets/videoPlaceholder.png";
import { RecommendationType } from "./Types/ConfigTypes";

import CoveoLogo from '../assets/Logo/CoveoLogo.svg'

import { home, search, wechat,} from 'react-icons-kit/fa'
import {weatherSunny as sun, lightbulb as Bulb} from 'react-icons-kit/typicons'

import Youtube from '../assets/ToolIcons/youtube.png'
import Concur from '../assets/ToolIcons/concur_logo.png';
import Confluence from '../assets/ToolIcons/confluence_logo.png';
import Slack from '../assets/ToolIcons/slack.png';
import Workday from '../assets/ToolIcons/workday_logo.png';
import JIRA from '../assets/ToolIcons/jira_logo.png';


/* How To import your Demo Logo
1. Place the logo in the assets Folder
2. import the logo into this file using the following statement

    import DemoLogo from "../assests/<Logo-Image-filename>"  

    * it is important to add the correct image extension type in the end of the filename e.g. DemoImage.png, DemoImage.svg or DemoImage.jpg

3. Replace the CoveoLogo with DemoLogo below.
*/

export const HeaderLogo = CoveoLogo;
export const DefaultRecommendationImage = RecommendationDefault;

export const HeaderConfig = [
  {
    title: "Dashboard",
    redirectTo: "/home",
    image: home,
  },
  {
    title: "Search",
    redirectTo: "/search",
    image: search,
  },
  {
    title: "Conversations",
    redirectTo: "/search/Facebook",
    image: wechat,
  }
];

export const HeroConfig = {
  title: "Good",
  titleIcon: sun,
  subtitle: "Your tasks today:",

 // Hero Text CSS config
  titleFontSize : "36px",
  titleFontWeight : "600",
  subTitleFontSize : "15px",
};

export const MainRecommendationConfig : RecommendationType= {
  titleIcon: Bulb,
  title : 'You May Be Interested In',
  concept: 'concepts',
  numberOfResults: 6,
  imageField : 'icon',
  pipeline : 'WorkShare',
  searchHub: 'default',
  id : 'Recommendation',
  active: true,
}

export const VideoRecommendationConfig : RecommendationType  = {
  titleIcon: Youtube,
  title : 'Recommended Videos',
  numberOfResults: 6,
  imageField : 'ytthumbnailurl',
  pipeline : 'Video Rec Sidebar',
  searchHub: 'default',
  id : 'Recommendation',
  active: true,
}

export const ToolsConfig = [
  {
  title  : 'Concur',
  desc : 'Expenses reports',
  image: Concur, 
  },
  {
    title  : 'Slack',
    desc : 'Official Chat platform',
    image:Slack, 
  },
  {
    title  : 'Confluence',
    desc : 'Internal documentation',
    image: Confluence, 
  },
  {
    title  : 'Workday',
    desc : 'Finance, HR, and planning',
    image: Workday, 
  },
  {
    title  : 'JIRA',
    desc : 'Agile Project Management',
    image: JIRA, 
  }
]

export const EXPANDED_SIDEPANEL_WIDTH = 280;
export const MINIMISED_SIDEPANEL_WIDTH = 120;
export const HEADER_HEIGHT = 90;

export const EnableAuthentication = false;
