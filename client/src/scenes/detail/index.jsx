import React, {  useEffect }  from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

import FlashOnIcon from '@mui/icons-material/FlashOn';
import {
  Box,
  useTheme,
  useMediaQuery,TableCell, TableHead
} from "@mui/material";
import StatBox from "components/StatBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../state/index";
import {rowData} from "scenes/dashboard";
import WeeklyTable from "../../components/WeeklyTable";
import DailyTable from "../../components/DailyTable";
import HourlyTable from "../../components/HourlyTable";

const Detail = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  if (!(rowData.ssno)) {
    navigate("/dashboard");
    return null;
  }

  const date = new Date(rowData.date);
  const month = date.getMonth() + 1; // returns the month (0-11), so we add 1 to get the actual month number
  const day = date.getDate(); // returns the day of the month (1-31)
  const hour = date.getHours(); // returns the hour (0-23)


  return (
    <Box m="1.5rem 2.5rem">

     <FlexBetween>
      <Header title={rowData.facility} subtitle="Detay Sayfası " />
     </FlexBetween>
     
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}

        <StatBox
          title="Endüktif Oran %"
          value={rowData && `%${Math.round(rowData.inductive_ratio)}`}
          description="*****"
          icon={
            <FlashOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Kapasitif Oran %"
          value={rowData && `%${Math.round(rowData.capacitive_ratio)}`}
          description="*****"
          icon={
            <FlashOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Toplam Aktif Tüketim"
          value={rowData && rowData.active_cons}
          description="*****"
          icon={
            <FlashOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Son Güncellenme"
          value={rowData && `${month}/${day} ${hour}:00`}
          description="*****"
          icon={
            <FlashOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
      <Box
        gridColumn="span 12"
        gridRow="span 8"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: isMobile ? "12px" : "inherit",
            padding: isMobile ? "8px" : "inherit",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >

      <TableHead>
        <TableCell variant="head" style={{ fontWeight: 'bold', fontSize: 'larger' }}>Haftalık Değerler</TableCell>
      </TableHead>
      <WeeklyTable />
      <TableHead>
        <TableCell variant="head" style={{ fontWeight: 'bold', fontSize: 'larger' }}>Günlük Değerler</TableCell>
      </TableHead>
      <DailyTable />
      <TableHead>
        <TableCell variant="head" style={{ fontWeight: 'bold', fontSize: 'larger' }}>Saatlik Değerler </TableCell>
      </TableHead>
      <HourlyTable />

      </Box>

      </Box>
    </Box>
  );
};

export default Detail;
