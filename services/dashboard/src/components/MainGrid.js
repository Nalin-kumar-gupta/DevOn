import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import Chip from "@mui/material/Chip";
import dashboardApi from "../webApi/dashboardApi";

const timeRanges = [
  {
    id: 1,
    label: "Current Day",
  },
  {
    id: 7,
    label: "Last Week",
  },
  {
    id: 30,
    label: "Last Month",
  },
];

export default function MainGrid({ selectedAppNo }) {
  const [logsData, setLogsData] = React.useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = React.useState(1);

  async function getLogs() {
    console.log("from maingrid.jsfile" + selectedAppNo);
    try {
      const req = {
        selectedApp: 1,
        selectedTimeRange: selectedTimeRange,
      };
      const logs = await dashboardApi.logsFetch(req);
      setLogsData(logs);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  }

  React.useEffect(() => {
    getLogs(selectedAppNo);
  }, [selectedAppNo]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Billing Overview
      </Typography> */}
      {/* <button onClick={getLogs}>Refresh</button> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginBottom: "8px",
        }}
      >
        <Stack direction="row" spacing={1}>
          {timeRanges.map((ele) => {
            return <Chip label="Chip Outlined" size="medium" variant="outlined" />;
          })}
        </Stack>
      </Box>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {/* {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))} */}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}

        <Grid size={{ sm: 12, md: 6 }}>
          <SessionsChart
            title={"CPU Usage"}
            subTitle={"CPU Usage of last 20 Minutes (MilliCores per minute)"}
            cpuData={logsData.map((element) => {
              return {
                timestamp: element.timestamp,
                usage: element.cpu_usage_millicores,
              };
            })}
          />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <SessionsChart
            title={"Memory Usage"}
            subTitle={"Memory Usage of last 20 Minutes (MB per minute)"}
            cpuData={logsData.map((element) => {
              return {
                timestamp: element.timestamp,
                usage: element.memory_usage_bytes / (1024 * 1024),
              };
            })}
          />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Logs
      </Typography>
      <Grid container spacing={2} columns={12}>
        <CustomizedDataGrid />
      </Grid>
    </Box>
  );
}
