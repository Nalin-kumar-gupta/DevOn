import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getAxisData(cpuData,axis='x') {
  const data = [];
  const yData = [];
  for (let i in cpuData) {
    data.push(cpuData[i].timestamp.substr(11,8));
    yData.push(cpuData[i].usage);
  }
  if(axis=='x') return data;
  return yData;
}

export default function SessionsChart(props) {
  const theme = useTheme();

  const colorPalette = [theme.palette.primary.dark];

  const { cpuData,title,subTitle } = props;

  const data = getAxisData(cpuData,'x');

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* <Typography variant="h4" component="p">
                $524
              </Typography>
              <Chip size="small" color="success" label="+35%" /> */}
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {subTitle}
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data,
              tickInterval: (index, i) => (i+1)%2==0,
            },
          ]}
          series={[
            {
              id: "packages",
              label: title,
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: getAxisData(cpuData,'y'),
            },
            // {
            //   id: 'visualizations',
            //   label: 'Visualizations',
            //   showMark: false,
            //   curve: 'linear',
            //   stack: 'total',
            //   area: true,
            //   stackOrder: 'ascending',
            //   data: [
            //     500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200,
            //     3500, 3800, 4100, 4400, 2900, 4700, 5000, 5300, 5600, 5900, 6200,
            //     6500, 5600, 6800, 7100, 7400, 7700, 8000,
            //   ],
            // },
            // {
            //   id: 'bill',
            //   label: 'Bill',
            //   showMark: false,
            //   curve: 'linear',
            //   stack: 'total',
            //   stackOrder: 'ascending',
            //   data: [
            //     1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500,
            //     3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500, 4000, 4700,
            //     5000, 5200, 4800, 5400, 5600, 5900, 6100, 6300,
            //   ],
            //   area: true,
            // },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-organic": {
              fill: "url('#organic')",
            },
            "& .MuiAreaElement-series-referral": {
              fill: "url('#referral')",
            },
            "& .MuiAreaElement-series-direct": {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="packages" />
          {/* <AreaGradient color={theme.palette.primary.main} id="visualizations" /> */}
          {/* <AreaGradient color={theme.palette.primary.main} id="bill" /> */}
        </LineChart>
      </CardContent>
    </Card>
  );
}
