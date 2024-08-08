import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';


import CustomCalendar from "components/reservation/mobile/CustomMultiCalendar";
import SelectRoom from "components/reservation/mobile/SelectRoom";
import SelectTime from "components/reservation/mobile/SelectTime";
import SelectMember from "components/reservation/mobile/SelectMember";

import functions from '@utils/functions';

type ValuePiece = any | Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type PostPageQuery = {
    menu: string;
};

const steps = [
    {
        code : 'step1',
        label: '객실',
        description: `객실을 선택해주세요.`,
    },
    {
        code : 'step2',
        label: '날짜',
        description: '날짜를 선택해주세요',
    },
    {
        code : 'step3',
        label: '패키지',
        description: `패키지을 선택해주세요`,
    },
    {
        code : 'step4',
        label: '인원',
        description: `인원을 선택해주세요`,
      },
];


const secondSteps = [
    {
        code : 'step1',
        label: 'F&B타입',
        description: `식당을 선택해주세요.`,
    },
    {
        code : 'step2',
        label: '테이블타입',
        description: '날짜를 선택해주세요',
    },
    {
        code : 'step3',
        label: '부대시설(무료)',
        description: `시간을 선택해주세요`,
    },
    {
        code : 'step4',
        label: '부대시설(유료)',
        description: `인원을 선택해주세요`,
      },
];
export default function Reservation() {
    const { t } = useTranslation(['common','yakwan']);
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const router =  useRouter();
    const query =  router.query as PostPageQuery;

    const [inputs, setInputs] = React.useState({
        reservation_room : null,
        reservation_roomName : null,
        reservation_checkin_date :  moment(new Date()).format("YYYY-MM-DD"),
        reservation_checkout_date :  moment(functions.addOneDay()).format("YYYY-MM-DD"),
        reservation_time_hour : null,
        reservation_time_minutes : null,
        reservation_member_adult : 0,
        reservation_member_children: 0,
        reservation_name : null,
        reservation_email : null,
        reservation_phone : null
    });
    const [dateValue, onDateChange] = React.useState<Value>(new Date());
    const disableDays = ["2024-02-19", "2024-02-28"]; // 이미 
    React.useEffect(() => {
        if ( activeStep == 0 ) {
            setInputs({
                reservation_room : null,
                reservation_roomName : null,
                reservation_checkin_date :  moment(new Date()).format("YYYY-MM-DD"),
                reservation_checkout_date :  moment(functions.addOneDay()).format("YYYY-MM-DD"),
                reservation_time_hour : null,
                reservation_time_minutes : null,
                reservation_member_adult : 0,
                reservation_member_children: 0,
                reservation_name : null,
                reservation_email : null,
                reservation_phone : null
            })
            if ( query.menu == 'fandb') {
                setValue(1)
            }else if ( query.menu == 'room') {
                setValue(2);
            }else{
                setValue(0)
            }
        }
    }, [query,activeStep]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if ( newValue != value ) {
            setValue(newValue);
            setActiveStep(0);
        }
    };

  const onSelectDate = (item:any) => {
    
    setInputs({
        ...inputs,
        reservation_checkin_date: item?.startDate,
        reservation_checkout_date: item?.endDate
    })
  }

  const renderLable = (index:number,step:any) => {
    if ( step.code == 'step1' ) {
        return (
            `${step.label} ${inputs.reservation_roomName ?? ""}`
        )
    }else if ( step.code == 'step2' ) {
        return (
            `${step.label} ${inputs.reservation_checkin_date+"("+(functions.convertDatetoWeekday(inputs.reservation_checkin_date))+")" }~`+ `${step.label} ${inputs.reservation_checkout_date+"("+(functions.convertDatetoWeekday(inputs.reservation_checkout_date))+") "+functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date)+"박"}`//+(functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date)+1)+"일"}`
        )
    }else if ( step.code == 'step3' ) {
        return (
            `${step.label} ${( functions.isEmpty(inputs.reservation_time_hour) ||functions.isEmpty(inputs.reservation_time_minutes) ) ? "" : inputs.reservation_time_hour+ ":"+inputs.reservation_time_minutes}`
        )
    }else if ( step.code == 'step4' ) {
        return (
            `${step.label} ${( inputs.reservation_member_adult == 0 && inputs.reservation_member_children == 0 ) ? "" : '일반 '+inputs.reservation_member_adult+ "명,소인 "+inputs.reservation_member_children+"명"}`
        )
    }
   
  }

  const renderNextButton = (index:number,step:string) => {
    if ( step == 'step1' ) {
        return (
            <Button
                disabled={functions.isEmpty(inputs.reservation_roomName)}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
            >
                {index === steps.length - 1 ? '완료' : '다음'}
            </Button>
        )
    }else if ( step == 'step2' ) {
        return (
            <Button
                disabled={false}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
            >
                {index === steps.length - 1 ? '완료' : '다음'}
            </Button>
        )
    }else if ( step == 'step3' ) {
        return (
            <Button
                disabled={functions.isEmpty(inputs.reservation_time_hour) && functions.isEmpty(inputs.reservation_time_minutes)}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
            >
                {index === steps.length - 1 ? '완료' : '다음'}
            </Button>
        )
    }else if ( step == 'step4' ) {
        return (
            <Button
                disabled={inputs.reservation_member_adult == 0 && inputs.reservation_member_children == 0}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
            >
                {index === steps.length - 1 ? '완료' : '다음'}
            </Button>
        )
    }
    
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


    return (
    <Box>
        <Box sx={{ maxWidth: 1024,padding : '10px 15px' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {
                    steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            {renderLable(index,step)}
                        </StepLabel>
                        <StepContent>
                        {
                            step.code == "step1"
                            ?
                            <SelectRoom 
                                onClickSelectDining={(val)=> setInputs({...inputs,reservation_room : val.code,reservation_roomName : val.label})} 
                                selectData={inputs.reservation_room} 
                                activeIndex={value}
                            />
                            :
                            step.code == "step2"
                            ?
                            <CustomCalendar 
                                onDateChange={onSelectDate} 
                                dateValue={dateValue} 
                                disableDays={disableDays}
                                ranges={[]}
                            />
                            :
                            step.code == "step3"
                            ?
                            <SelectTime 
                                onClickSelectHour={(val)=> setInputs({...inputs,reservation_time_hour : val})} 
                                onClickSelectMinute={(val)=> setInputs({...inputs,reservation_time_minutes : val})} 
                                selectHour={inputs.reservation_time_hour} 
                                selectMinute={inputs.reservation_time_minutes} 
                            />
                            :
                            step.code == "step4"
                            ?
                            <SelectMember 
                                onClickSelectAdult={(val)=> setInputs({...inputs,reservation_member_adult : val})} 
                                onClickSelectChild={(val)=> setInputs({...inputs,reservation_member_children : val})} 
                                selectAdult={inputs.reservation_member_adult} 
                                selectChild={inputs.reservation_member_children} 
                            />
                            :
                            <Typography>{step.description}</Typography>
                        }
                        
                        <Box sx={{ mb: 2 }}>
                            <div>
                            {   
                                renderNextButton(index,step.code) 
                            }
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    뒤로
                                </Button>
                            </div>
                        </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 1 }}>
                    <Typography>선택완료</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        초기화
                    </Button>
                </Paper>
            )}
        </Box>
        
        <Box
            component="form"
            sx={{
                padding:'5px 10px',
                '& .MuiTextField-root': { m: 1, width: '95%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                required
                size="small"
                id="inputs-name"
                label="예약자명"
                placeholder="예약자 이름 입력"
            />
            <TextField
                required
                size="small"
                id="inputs-email"
                label="이메일"
                placeholder="예)foodmall@foodmall.co.kr"
            />
            <TextField
                required
                size="small"
                id="inputs-phone"
                label="연락처"
                placeholder="숫자만 입력해주세요"
            />
        </Box>
    </Box>
  );
}
