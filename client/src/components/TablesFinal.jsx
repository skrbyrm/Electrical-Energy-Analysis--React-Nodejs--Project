import React, { useState, useEffect }  from "react";
import {
    Box,
    Button,
    useTheme,
    useMediaQuery,Tabs, Tab,
  } from "@mui/material";
import WeeklyTable from "./WeeklyTable";
import DailyTable from "./DailyTable";
import HourlyTable from "./HourlyTable";


const TablesFinal = () => {
    const [value, setValue] = useState(null);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Weekly" />
          <Tab label="Daily" />
          <Tab label="Hourly" />
        </Tabs>
        <Box>
          {value === 0 && <WeeklyTable />}
          {value === 1 && <DailyTable />}
          {value === 2 && <HourlyTable />}
        </Box>
      </>
    );
  }

  export default WeeklyTable;
