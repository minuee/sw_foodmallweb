import React, { useState,useRef } from "react";
import Slider from "react-slick";
import { Box,Typography } from "@mui/material";
import Image from "next/image";

import Sample_Image_01 from "@images/home/sample/insta_01.jpg";
import Sample_Image_02 from "@images/home/sample/insta_02.jpg";
import Sample_Image_03 from "@images/home/sample/insta_03.jpg";
import Sample_Image_04 from "@images/home/sample/insta_04.jpg";
import Sample_Image_05 from "@images/home/sample/insta_05.jpg";
import Sample_Image_06 from "@images/home/sample/insta_06.jpg";
import Sample_Image_07 from "@images/home/sample/insta_07.jpg";
import Sample_Image_08 from "@images/home/sample/insta_08.jpg";


type MultiCarouselProps = {
  data? : any,
  setParentActiveSlide: (num: number) => void | undefined;
};

const MultiCarousel: React.FC<MultiCarouselProps> = ({ data,setParentActiveSlide}) => {
  const settings = {
    className: "slider variable-width",
    adaptiveHeight: true,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "60px",
    swipeToSlide: false,
    beforeChange: (current:any, next:any) => {
      setOldSlide(current);
      setActiveSlide(next);
      setParentActiveSlide(next)
    }
  };

  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  let sliderRef = useRef(null) as any;

  const onClickMovePage = (idx:number,val:string) => {
    if ( idx ==  activeSlide ) {
      window.open(val);
    }else{
      sliderRef.slickGoTo(idx)
    }
  }

  if ( data.length == 0  ) {
    return (
      <Box sx={styles.emptyWrapper}>
        <Typography variant="manrope" sx={styles.eventTitle}>
          Waiting For Event
        </Typography>
      </Box>
    )
  }
  return (
    <div className="slider-container">
      <Slider 
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {
          data?.map((item:any,index:number) => {
            return (
              <Box sx={activeSlide == index ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(index,item.link)} key={index}>
                <Image 
                  width={activeSlide == index ? 300 : 202}
                  height={activeSlide == index ? 300 : 202}
                  alt={"sub popup"}
                  src={item.photo}
                  style={{flex:1,objectFit: 'contain',width: activeSlide == index ? 300 : 202,height:activeSlide == index ? 300 : 202,opacity: activeSlide == index ? 1 : 0.5,borderRadius:"15px",marginLeft:"20px" }}
                />
            </Box>
            )
          })
        }
        
       {/*  <Box sx={activeSlide == 1 ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(1)}>
          <Image 
            alt={"sub popup"}
            src={Sample_Image_02}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',width:activeSlide == 1 ? 300 : 202,height:activeSlide == 1 ? 300 : 202,opacity: activeSlide == 1 ? 1 : 0.5,borderRadius:"15px",marginLeft:"20px" }}
          />
        </Box>
        <Box sx={activeSlide == 2 ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(2)}>
          <Image 
            alt={"sub popup"}
            src={Sample_Image_03}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',width:activeSlide == 2 ? 300 : 202,height:activeSlide == 2 ? 300 : 202,opacity: activeSlide == 2 ? 1 : 0.5,borderRadius:"15px",marginLeft:"20px"  }}
          />
        </Box>
        <Box sx={activeSlide == 3 ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(3)}>
          <Image 
            alt={"sub popup"}
            src={Sample_Image_04}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',width:activeSlide == 3 ? 300 : 202,height:activeSlide == 3 ? 300 : 202,opacity: activeSlide == 3 ? 1 : 0.5 ,borderRadius:"15px",marginLeft:"20px" }}
          />
        </Box>
        <Box sx={activeSlide == 4 ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(4)}>
          <Image 
            alt={"sub popup"}
            src={Sample_Image_05}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',width:activeSlide == 4 ? 300 : 202,height:activeSlide == 4 ? 300 : 202,opacity: activeSlide == 4 ? 1 : 0.5,borderRadius:"15px",marginLeft:"20px"  }}
          />
        </Box>
        <Box sx={activeSlide == 5 ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(5)}>
          <Image 
            alt={"sub popup"}
            src={Sample_Image_06}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',width:activeSlide == 5 ? 300 : 202,height:activeSlide == 5 ? 300 : 202,opacity: activeSlide == 5 ? 1 : 0.5,borderRadius:"15px",marginLeft:"20px"  }}
          />
        </Box>
        <Box sx={activeSlide == 6 ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(6)}>
          <Image 
            alt={"sub popup"}
            src={Sample_Image_07}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',width:activeSlide == 6 ? 300 : 202,height:activeSlide == 6 ? 300 : 202,opacity: activeSlide == 6 ? 1 : 0.5,borderRadius:"15px",marginLeft:"20px" }}
          />
        </Box>
        <Box sx={activeSlide == 7 ?  styles.selectedWrapper : styles.defaultWrapper} onClick={()=>onClickMovePage(7)}>
          <Image 
            alt={"sub popup"}
            src={Sample_Image_08}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',width:activeSlide == 7 ? 300 : 202,height:activeSlide == 7 ? 300 : 202,opacity: activeSlide == 7 ? 1 : 0.5,borderRadius:"15px",marginLeft:"20px"  }}
          />
        </Box> */}
      </Slider>
    </div>
  );
}

const styles = {
  defaultWrapper :{ 
    display:'flex',alignItems:'flex-end',justifyContent:'flex-end',width:'300px',height:"375px",margin:'25px 10px',paddingTop:"120px",cursor:'pointer'
  },
  emptyWrapper : {
    display:'flex',width:'100%',height:"300px",justifyContent:'center',alignItems:'center',backgroundColor:'#f7f7f7'
  },
  selectedWrapper : {
    display:'flex',justifyContent:'center',alignItems:'flex-end',width:'300px',height:"375px",margin:'25px 10px',paddingTop:"20px",cursor:'pointer'
  },
  eventTitle : {
    fontSize: '20px',fontWeight: 'bold',fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: 'normal',textAlign: 'center',color: '#22201f',
  },
}

export default MultiCarousel;