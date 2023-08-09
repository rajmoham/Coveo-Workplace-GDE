import { FieldToIncludesInSearchResults } from "../SearchConfig";

export interface DefaultSideBarRecommendationConfigType {
    pipeline: string,
    searchHub : string,
    NumberofResults: number,
    title: string
    videoRecommendation? : boolean
    imageField? : typeof FieldToIncludesInSearchResults[number]
  }



export interface FacetConfigType {
  field : string,
  title : string
}  


export interface FileTypeIconsConfigType {
  imageRef : string; 
}


export interface sideBarRecommendationConfigType {
  pipeline : string;
  searchHub : string;
  NumberofResults: number;
  title: string;
  videoRecommendation? : boolean
  imageField? : typeof FieldToIncludesInSearchResults[number]
}

export interface SearchPageTabConfigType {
  caption : string;
  expression : string;
  isActive : boolean;
  sideBarRecommendationConfig? : sideBarRecommendationConfigType[];
  facetToInclude: string[];
  categoryFacet: boolean;
}

export interface RecommendationType {
  titleIcon?: string,
  title? : string,
  description? : string,
  concept?: string,
  numberOfResults?: number,
  imageField? : typeof FieldToIncludesInSearchResults[number],
  pipeline? : string,
  id? : string,
  searchHub : string,
  active : boolean
}