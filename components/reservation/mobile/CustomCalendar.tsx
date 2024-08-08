import * as React from 'react';
import moment from "moment";
import styled from 'styled-components';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: #555;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: #000;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #ff0000;
  }
  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: #ff0000;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    font-weight:bold;
    abbr {
      color: #4460de;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: #ccc;
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: #ccc;
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 5px 0px 18px 0px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ccc;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: #ff0000;
    border-radius: 10%;
  }
`;

//const StyledCalendar = styled(UnstyledCalendar)<CalendarProps>``;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.div`
  position: absolute;
  right: 3%;
  bottom: 1%;
  color:#555;
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  & > span.sred{
    color:#ff0000;
    font-size: 1rem;
  }
  & > span.sgray {
    color:#ccc;
    font-size: 1rem;
  }
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: 0.5rem;
  font-family: SourceHanSans;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
    border:1px solid #ccc;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

type CustomCalendarProps = {
    disableDays:any;
    dateValue?:any,
    onDateChange(date:any): void;
};


const CustomCalendar: React.FC<CustomCalendarProps> = ({ dateValue,onDateChange,disableDays}) => {
    const today = new Date();
    const [activeStartDate, setActiveStartDate] = React.useState<Date | null>(new Date());

    React.useEffect(() => {
  
    }, []);
  
    const handleTodayClick = () => {
        //setActiveStartDate(today);
        onDateChange(today);
      };
    return (
        <StyledCalendarWrapper>
            <Calendar 
                onClickDay={onDateChange} 
                value={dateValue}
                minDate={today} 
                formatDay={(locale:any, date:any) => moment(date).format("D")}
                formatYear={(locale:any, date:any) => moment(date).format("YYYY")}
                formatMonthYear={(locale:any, date:any) => moment(date).format("YYYY. MM")}
                calendarType="gregory"
                showNeighboringMonth={false}
                next2Label={null}
                prev2Label={null}
                minDetail="year"
                // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
                /* activeStartDate={
                    activeStartDate === null ? undefined : activeStartDate
                } */
               /*  onActiveStartDateChange={({ activeStartDate }:any) =>
                    setActiveStartDate(activeStartDate)
                } */
                tileDisabled={({date}:any) => disableDays.includes(moment(date).format("YYYY-MM-DD"))}
                // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
                tileContent={({ date, view }:any) => {
                    let html = [];
                    if ( view === "month" && date.getMonth() === today.getMonth() && date.getDate() === today.getDate() ) 
                    {
                        html.push(<StyledToday key={"today"}>오늘</StyledToday>);
                    }
                    /* if ( disableDays.find((x:any) => x === moment(date).format("YYYY-MM-DD")) ) {
                        html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
                    } */
                    return <>{html}</>
                }}
            />
            <StyledDate><span className='sred'>●</span>선택 <span className='sgray'>●</span>마감</StyledDate>
        </StyledCalendarWrapper>
    );
  }

  export default CustomCalendar;