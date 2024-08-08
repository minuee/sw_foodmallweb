import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { defaultStaticRanges } from "./mobile/defaultRanges.js";
import moment from "moment";
import ko from 'date-fns/locale/ko';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file


type CustomCalendarProps = {
  ranges:any;
  disableDays:any;
  dateValue?:any;
  onDateChange(date:any): void;
};
const CustomCalendar: React.FC<CustomCalendarProps> = ({ dateValue,onDateChange,disableDays}) => {

     const [selectedDateRange, setSelectedDateRange] = useState<any>({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
     });
     const [show, setShow] = useState(false);

     const handleSelect = (ranges:any) => {
          setSelectedDateRange(ranges.selection);
          onDateChange({
               startDate:  moment(ranges.selection.startDate).format("YYYY-MM-DD"),
               endDate: moment(ranges.selection.endDate).format("YYYY-MM-DD"),
          })
     };

     const onClickClear = () => {
          setSelectedDateRange({
               startDate: new Date(),
               endDate: new Date(),
               key: "selection"
          });
          setShow(false);
     };

     return (
           <DateRangePicker
              locale={ko} 
              showDateDisplay={false}
              rangeColors={["#bb9b6a"]}
              onChange={handleSelect}
              // /showSelectionPreview={false}
              //moveRangeOnFirstSelection={true}
              months={2}
              ranges={[selectedDateRange]}
              direction="horizontal"
              //disabledDates={["2024-02-29"]}
              minDate={new Date()}
            />

     );
};

CustomCalendar.defaultProps = {
     ranges: defaultStaticRanges
};

export default CustomCalendar;
