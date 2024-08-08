import * as React from 'react';
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useStyles  } from 'styles/mobile/main';
import { useRecoilState } from "recoil";

import IMG_ROOM4 from "@images/reservation/bupet.png";
import ICON_POPUP_CLOSE from "@icons/popup-close.png";


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type SnsDetailProps = {
    setPopDetailOpen: (popDetailOpen: boolean) => void;
  };

const FloorDetail: React.FC<SnsDetailProps> = ({ setPopDetailOpen}) => {
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);

    const popDetailRef = React.useRef(null);
    const classes = useStyles();

    return (
        <NoSsr>
            <Box ref={popDetailRef} sx={{display:'flex',position:'absolute',left:0,bottom:0,flex:1,justifyContent:'center',overflow:'hidden'}}>
                <Box 
                    className={classes.closeBoxWrap}
                    onClick={() => setPopDetailOpen(false)}
                >
                    <Image 
                        alt={"sub"}
                        src={ICON_POPUP_CLOSE}
                        style={{width:'20px',height:'20px'}}
                    />
                </Box>
                <Card >
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            SW
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title="Instagram from noh"
                        subheader="September 14, 2023"
                    />
                    <Image 
                        src={IMG_ROOM4}  
                        alt="slide" 
                        style={{
                            width:'100%',
                            objectFit: 'contain',
                            opacity:0.9
                        }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                    </CardActions>    
                </Card>
                
            </Box>
        </NoSsr>
    )
}

export default FloorDetail;