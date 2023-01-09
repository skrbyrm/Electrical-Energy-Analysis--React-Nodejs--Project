import React, { useState, useEffect }  from "react";
import {
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { finalClick } from "scenes/dashboard";
import config from "config";
import BarChart from 'react-apexcharts';

const BarGraph = () => {
  const url = `${config.urls.BACKEND_SERVER_DAILY}${finalClick}`;

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setdetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getdetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setdetail(response.data);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdetail();
  }, []);

  const columns = [

    {
      headerName: "Tarih",
      field: "date",
      flex: 1,
      cellRenderer:(params) => {
        const date = new Date(params);
        const month = date.getMonth() + 1; // returns the month (0-11), so we add 1 to get the actual month number
        const day = date.getDate(); // returns the day of the month (1-31)
        const year = date.getFullYear();
        const hour = date.getHours(); // returns the hour (0-23)
        const formattedDate = `${day}/${month}/${year}-${hour}:00`;
        return formattedDate;
      },
      minWidth: isMobile ? "50px" : "70px"
    },
    {
      headerName: "Aktif Tüketim",
      field: "active_cons",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Endüktif Tüketim",
      field: "inductive_cons",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    {
      headerName: "Kapasitif Tüketim",
      field: "capacitive_cons",
      flex: 0.5,
      minWidth: isMobile ? "50px" : "70px",
    },
    
    
    ];

  const getMonth = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth() + 1; // getMonth() returns the month (0-11), so we add 1 to get the actual month number
  }
  
  const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate(); // getDate() returns the day of the month (1-31)
  }
  const currentMonth = new Date().getMonth() + 1; // get the current month number
  const currentMonthData = data.filter(datum => getMonth(datum.date) === currentMonth);
  
  const transformedData = currentMonthData.map(datum => ({
    date: getDay(datum.date), // extract the day of the month
    value: datum.active_cons // the value to display in the bar chart
  }));

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: transformedData.map(datum => datum.date),
      colors: theme.palette.secondary[400]
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: theme.palette.secondary[100]
    },
    series: [
      {
        name: 'Tüketim',
        colors: theme.palette.secondary.alt,
        data: transformedData.map(datum => datum.value),
      },
    ],
  };

  return (
    <BarChart
      options={chartOptions}
      series={chartOptions.series}
      type="bar"
      width={isMobile ? '100%' : '100%'}
      height={isMobile ? '100%' : '100%'}
    />
  );
};

export default BarGraph ;
