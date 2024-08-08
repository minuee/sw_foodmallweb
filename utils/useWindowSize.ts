import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isMobile,isTablet,isIOS,isAndroid, isDesktop } from "react-device-detect";
import { landscapeState } from "@stores/layoutStore";
export const versionCode = "v1.1.0";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState([0,0])
    // 화면 가로모드 여부 확인
    const [islandscape, setIsLandscape] = useRecoilState(landscapeState);

    const minWidthPixel = isTablet ? 450 : 300;

    const updateWindowSize = () => {
       
        setWindowSize([window.innerWidth, window.innerHeight]);

        if ( window.innerWidth > window.innerHeight ) {
            if (  window.innerWidth > 0 &&  window.innerHeight > 0 ) {
                if (  islandscape.baseWidth == 0 ||  ( window.innerWidth >= islandscape.baseWidth*0.98 || window.innerWidth >= islandscape.baseHeight*0.98 )  ) {
                    
                    if ( islandscape.baseWidth == 0 ) {
                        setIsLandscape({
                            isLandscape : true,
                            width: window.innerWidth,
                            height: window.innerHeight,
                            baseWidth: window.innerWidth,
                            baseHeight: window.innerHeight
                        })
                    }else{
                        if ( window.innerWidth > minWidthPixel ) {
                            setIsLandscape({
                                ...islandscape,
                                isLandscape : true,
                                width: window.innerWidth,
                                height: window.innerHeight,
                            })
                        }
                    }
                }
            }
            
        }else{
            if (  window.innerWidth > 0 &&  window.innerHeight > 0 ) {
                if (  islandscape.baseWidth == 0 ||  ( window.innerWidth >= islandscape.baseWidth*0.98 || window.innerWidth >= islandscape.baseHeight*0.98 )  ) {
                    
                    if ( islandscape.baseWidth == 0 ) {
                        try {
                            setIsLandscape({
                                isLandscape : false,
                                width: window.innerWidth,
                                height: window.innerHeight,
                                baseWidth: window.innerWidth,
                                baseHeight: window.innerHeight
                            })
                        }catch(e){
                        }
                        
                    }else{
                        if ( window.innerWidth > minWidthPixel ) {
                            setIsLandscape({
                                ...islandscape,
                                isLandscape : false,
                                width: window.innerWidth,
                                height: window.innerHeight
                            })
                        }
                    }

                }
            }
        }
    }
    useEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();
        return () => window.removeEventListener('resize', updateWindowSize);
    },[])

    if ( isTablet || isMobile) {
        if(windowSize[0] < 768 ){
            return 'Mobile';
        }else{
            return 'Tablet';
        }
    }else{
        if ( isDesktop && !isMobile && !isTablet )  {
            return 'PC';
        }else if ( windowSize[0] > 1024 ) {
            return 'PC';
        }else if( windowSize[0] <= 1024 && windowSize[0] >= 768) {
            return 'Tablet';
        }else if(windowSize[0] < 768 ){
            return 'Mobile';
        }else{
            return 'PC';
        }
    }
    //return [windowSize[0], windowSize[1]]
}
