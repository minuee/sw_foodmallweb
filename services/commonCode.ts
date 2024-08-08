import functions from '@utils/functions';
import * as localStorage from '@utils/localStorage';

function codeService  (code : string , type : string = '' ) {
    const tmpCodeInfo:any = localStorage.getItem("commonCode");
    const codeInfo:any = JSON.parse(tmpCodeInfo);

    if ( functions.isEmpty(code) ) {
        return code;
    }else{
        const ret = codeInfo?.code.filter((element:any) =>  element.code == code);
        return ret?.length == 0 ? code : ret[0].name;
    }
};

export default codeService;
