"use client"; // Use Client Components
import * as React from 'react';
import { Box, Button, Paper, Typography, FormControl,FormControlLabel,Checkbox, } from "@mui/material";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';

import functions from '@utils/functions';

type ValuePiece = any | Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type PostPageQuery = {
    menu: string;
};

const steps = [
    {
        code : 'step1',
        label: '이용 약관 동의',
        description: `이용 약관 동의`,
    },
    {
        code : 'step2',
        label: '이름',
        description: '이름을 선택해주세요',
    },
    {
        code : 'step3',
        label: '인증하기',
        description: `시휴대폰번호를 인증`,
    },
    {
        code : 'step4',
        label: '이메일',
        description: `이메일을 입력해주세요`,
    },
    {
        code : 'step5',
        label: '비밀번호',
        description: `비밀번호를 입력해주세요`,
    },
];


export default function RegistScreen() {
    const { t } = useTranslation(['common','yakwan']);
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [checked, setChecked] = React.useState(false)


    const [inputs, setInputs] = React.useState({
        agree : false,
        user_name : "",
        user_phone : "",
        auth_code : "123456",
        is_auth : true,
        user_email : "",
        user_password : "",
        user_password_2 : "",
    });
    const [dateValue, onDateChange] = React.useState<Value>(new Date());
    const disableDays = ["2024-02-19", "2024-02-28"]; // 이미 
    React.useEffect(() => {
        if ( activeStep == 0 ) {
            setInputs({
                agree : true,
                user_name : "",
                user_phone : "",
                auth_code : "123456",
                is_auth : true,
                user_email : "",
                user_password : "",
                user_password_2 : "",
            })
        }
    }, [activeStep]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if ( newValue != value ) {
            setValue(newValue);
            setActiveStep(0);
        }
    };


  const renderLable = (index:number,step:any) => {
    if ( step.code == 'step1' ) {
        return (
            `${step.label}`
        )
    }else if ( step.code == 'step2' ) {
        return (
            `${step.label} ${functions.isEmpty(inputs.user_name) ? "" : inputs.user_name}`
        )
    }else if ( step.code == 'step3' ) {
        return (
            `${step.label} ${functions.isEmpty(inputs.auth_code) ? "" : inputs.auth_code}`
        )
    }else if ( step.code == 'step4' ) {
        return (
            `${step.label} ${functions.isEmpty(inputs.user_email) ? "" : inputs.user_email}`
        )
    }else if ( step.code == 'step5' ) {
        return (
            `${step.label} le*********`
        )
    }
   
  }

    const renderNextButton = (index:number,step:string) => {
        if ( step == 'step1' ) {
            return (
                <Button
                    disabled={!inputs.agree}
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
                    disabled={functions.isEmpty(inputs.user_name)}
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
                    disabled={functions.isEmpty(inputs.auth_code) && functions.isEmpty(inputs.is_auth)}
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
                    disabled={functions.isEmpty(inputs.user_email)}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                >
                    {index === steps.length - 1 ? '완료' : '다음'}
                </Button>
            )
        }else if ( step == 'step5' ) {
            return (
                <Button
                    disabled={functions.isEmpty(inputs.user_password) || inputs.user_password != inputs.user_password_2 }
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
        if ( activeStep ==  3) {
            if ( functions.isEmail(inputs.user_email) === false ) {
                return;
            }else{
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const HandleOnChange = (e:any,type:string) => {
        setInputs({
            ...inputs,
            [type] : e.target.value.trim()
        })
    }

    // 동의 체크
    const handleAgree = (event:any) => {
        setChecked(event.target.checked)
    }

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
                            <Box>
                                <FormControlLabel
                                    control={
                                    <Checkbox onChange={handleAgree} color="primary" checked={inputs.agree} />
                                    }
                                    label="회원가입 약관에 동의합니다."
                                />
                            </Box>
                            :
                            step.code == "step2"
                            ?
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
                                    onChange={(e) => HandleOnChange(e,'user_name')}
                                    required
                                    size="small"
                                    id="inputs-user_name"
                                    label="이름"
                                    placeholder="이름 입력"
                                />
                            </Box>
                            :
                            step.code == "step3"
                            ?
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
                                    id="inputs-user_phone"
                                    label="휴대폰번호"
                                    placeholder="휴대폰번호 입력"
                                    onChange={(e) => HandleOnChange(e,'user_phone')}
                                />
                                <TextField
                                    disabled
                                    required
                                    defaultValue={inputs?.user_name}
                                    size="small"
                                    id="inputs-name"
                                    label="이름"
                                    placeholder="이름 입력"
                                />
                                {
                                    ( functions.isEmpty(inputs.user_phone) && functions.isEmpty(inputs.user_name) ) && (
                                        <TextField
                                            required
                                            defaultValue={inputs?.auth_code}
                                            size="small"
                                            id="inputs-auth_code"
                                            label="인증번호"
                                            placeholder="인증번호 입력"
                                        />
                                    )
                                }
                            </Box>
                            :
                            step.code == "step4"
                            ?
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
                                    error={!functions.isEmail(inputs.user_email)}
                                    required
                                    size="small"
                                    id="inputs-user_email"
                                    label="이메일"
                                    placeholder="이메일 입력"
                                    onChange={(e) => HandleOnChange(e,'user_email')}
                                    helperText={functions.isEmail(inputs.user_email) ? "" : "정확한 이메일 주소를 입력해 주세요."}
                                />
                            </Box>
                            :
                            step.code == "step5"
                            ?
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
                                    id="inputs-user_password"
                                    label="비밀번호"
                                    placeholder="비밀번호 입력"
                                    onChange={(e) => HandleOnChange(e,'user_password')}
                                />
                                <TextField
                                    required
                                    size="small"
                                    id="inputs-user_password_2"
                                    label="비밀번호 확인"
                                    placeholder="비밀번호 입력"
                                    onChange={(e) => HandleOnChange(e,'user_password_2')}
                                />
                            </Box>
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
                    <Button
                        color={'inherit'}
                        size='small'
                        variant={'outlined'}
                        sx={styles.moreBtn}
                    >
                        <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'0.9em'}}>등록하기 </Typography>
                    </Button>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        다시 등록
                    </Button>
                </Paper>
            )}
        </Box>
    </Box>
  );
}


const styles = {
   
    moreBtn : {
        border:'1px solid #f84040',borderRadius:'5px',padding:'2px',marginTop:'3px',backgroundColor:'#f84040'
    }
}