import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';

import { reqGetBoardList } from "@service/common"

export const useGetBoardList = async (): Promise<any> => {
  const res = await reqGetBoardList();
  if (res.status !== 200) {
    return null;
  } else if (!res.data) {
    return null;
  } else if (res.data.state === 'false') {
    return null;
  }
  return res.data?.row;
};