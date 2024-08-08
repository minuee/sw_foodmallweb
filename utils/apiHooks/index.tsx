import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from 'react';
import * as apiObject from 'utils/api';
import functions from 'utils/functions';
export const SampleKey = "SampleListKey";


//필요한 검색컬럼만 걸러내기 By noh.sn
function extractFilter ( arr : any , filterList : any ) {
  let newObj:any = {};
  if ( functions.isEmpty(filterList) ) {
    return arr;
  }
  for( const [ key, value ] of Object.entries(arr)) {
    if ( filterList.includes(key)) {
      newObj[key] = value
    }
  }
  const newQueryObj = Object.assign({...newObj});
  return newQueryObj
}


export const useGetListQuery = ( queryKey:string = SampleKey,  url:string) => {
  return useQuery(
      [queryKey],
      async () => await apiObject.get(url),
      { keepPreviousData: true, staleTime: 10 * 1000, }
    );
}

export const useGetListPostQuery = ( queryKey:string = SampleKey,  url:string, params:any  ) => {
  const { data: defaultData , refetch, isLoading} = useQuery(
    [queryKey, params],
    async () => await apiObject.post(url, {...extractFilter(params.postData, params?.ApiSearchParamFiled || [])}),
    { keepPreviousData: false, staleTime: 10 * 1000, }
  );
  const dataList = useMemo(() => {

    //이게 정상 return defaultData?.state == "true" ? { row : defaultData?.row, total : defaultData?.total } : {row : [] , total : 0}
    return ( defaultData?.total > 0 || defaultData?.state == "true" ) ? { row : defaultData?.row, total : defaultData?.total || defaultData?.row?.length } : {row : [] , total : 0}
  }, [defaultData]);
  return {data : dataList, refetch, isLoading}
}

export const useCUDPMutation = (
  queryKey:string,
  url:string,
  params : any,
  succesCallback : () => void,
  errorCallback : () => void
) => {
  return useMutation([queryKey, params], () => apiObject.post(url, params),
  {
    onSuccess : succesCallback,
    onError : errorCallback
  })
}
