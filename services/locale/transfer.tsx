import * as React from 'react';
import { useTranslation } from 'next-i18next';

const LocaleTransfer = (t2:any,partType:any,name:any) => {
    try{
        if ( t2 != undefined ) {
            return t2(name);
        }else{
            const { t } = useTranslation(partType);
            return t(name);
        }
    }catch(e){
        return name;
    }
}

export default LocaleTransfer;
