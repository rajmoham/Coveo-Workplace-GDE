import {
  DefaultSideBarRecommendationConfigType,
  SearchPageTabConfigType,
} from "./Types/ConfigTypes";


/* 
FieldToIncludesInSearchResults helps you add more fields to the result templates. 
When setting imageField in this file, make sure the field is included in the FieldToIncludesInSearchResults array. 

The fields 'date', 'ytthumbnailurl', 'sysfiletype' should NOT be removed. 
*/

export const FieldToIncludesInSearchResults: string[] = [
  "sfanswer__c",
  "sfid",
  "sysfiletype",
  "date",
  "adimage",
  "ytthumbnailurl",
  "sfimage__c",
  "sfimage_url__c",
  "adspecial",
  "ytthumbnailurl",
  "ytvideoduration"
];

export const FacetConfig = [
  {
    field: "source",
    title: "Source",
  },
  {
    field: "author",
    title: "Author",
  },
  {
    field: "filetype",
    title: "File Type",
  },
  {
    field: "concepts",
    title: "Popular Topics",
  },
  {
    field: "profile_sectors",
    title: "Sectors",
  },
  {
    field: "profile_services",
    title: "Services",
  },
  {
    field :"adspecial",
    title : "Speciality"
  },{
    field :"adminimums",
    title : "Minimums"
  },{
    field :"adstate",
    title : "State"
  },{
    field :"adcity",
    title : "City"
  },{
    field : "mynav4b",
    title: "More Info",
  },
  {
    field: "category",
    title: "Platform Solutions"
  }
] as const;

/* 
SearchPageTabConfig helps you configure the Tabs. Each object represent a new Tab.

 - caption -> Name of the Tab
 - expression -> query expression to show in the Tab
 - isActive -> To be active initially when search page loads up
 - sideBarRecommendationConfig -> Can add multiple recommendation in the side bar
 - facetToInclude -> the facets that will be displayed respective with each tab


You can leave the Array empty if you don't want any tabs

*/

export const SearchPageTabConfig : SearchPageTabConfigType[] = [
  {
    caption: "All",
    expression: "",
    isActive: true,
    sideBarRecommendationConfig: [
      {
        pipeline: "Video Rec Sidebar",
        searchHub : 'default',
        NumberofResults: 3,
        title: "Related Videos",
        videoRecommendation: true,
        imageField: 'ytthumbnailurl',
      }
    ],
    facetToInclude: ["source","author", "concepts",],
    categoryFacet: true,
  },
  {
    caption: "Coveo Blog",
    expression: `@source==Blog`,
    isActive: false,
    sideBarRecommendationConfig: [
      {
        pipeline: "Video Rec Sidebar",
        searchHub : 'default',
        NumberofResults: 6,
        title: "Related for Investing",
        imageField : 'ytthumbnailurl',
        videoRecommendation: false,
      },
    ],
    facetToInclude: ["source", "concepts",],
    categoryFacet: false,
  },
  {
    caption: "HR",
    expression: `@sourcetype==("Sitemap")`,
    isActive: false,
    facetToInclude: ["category"],
    categoryFacet: false,
  },
  {
    caption: "SharePoint",
    expression: `@source==Sharepoint`,
    isActive: false,
    facetToInclude: ["concepts", "source", "concepts",],
    categoryFacet: false,
  },
  {
    caption: "Facebook",
    expression: `@filetype=("PostFB", "CommentFB")`,
    isActive: false,
    facetToInclude: ["concepts"],
    categoryFacet: false,
  },
  {
    caption: "Coveo Web",
    expression: `@source==("Sitemap")`,
    isActive: false,
    facetToInclude: ["source", "concepts"],
    categoryFacet: false,
  },
  {
    caption: "Youtube",
    expression: `@filetype=="youtubevideo"`,
    isActive: false,
    facetToInclude: ["concepts", "authors"],
    categoryFacet: false,
  },
];

/* 
DefaultSideBarRecommendationConfig is used if you want to show same sideBar recommendation on each tab.
*/

export const DefaultSideBarRecommendationConfig: DefaultSideBarRecommendationConfigType[] =
  []; /* [{
  pipeline: "IRS test",
  NumberofResults: 5,
  title: "Related for Investing",
  videoRecommendation: true,
  imageField: 'ytthumbnailurl'
}] */




export const EnableRecentQueries = true;

export const EnableRecentResultList = true;
