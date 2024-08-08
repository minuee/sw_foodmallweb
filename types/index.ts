export class Response {
  state?: string;
  row: Array<any> | any;
  function?: string;
}

export class ResponseList {
  state?: string; //상태
  row?: Array<any> | any;
  message?: string; //에러메시지
  total?: number; //총 수량
  total_count?: number; //총 수량
}

export class ResponseSave {
  state?: string; //상태
  message?: string; //에러메시지
  idx?: number; //등록 Seq
}

export interface optionListStyled {
  isHideLable? : boolean,
  minWidth? : string,
  maxWidth? : string,
}

//모바일 건물 
export interface mobileSelectBuildingType {
  selectData : 'left' | 'right' | null;
}

//모바일 층별
export interface mobileSelectFloorType {
  selectData : any | null;
}
