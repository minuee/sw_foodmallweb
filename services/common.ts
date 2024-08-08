
import * as apiObject from '@utils/api';
import { ResponseList } from "types/index"

export function reqGetBoardList(): apiObject.ApiResponse<ResponseList> {
  return apiObject.post('/sr_system_api/board/board.php?action=findList', {});
}

