import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Select, { selectClasses } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent({ setSelectedAppNo }) {
  const [company, setCompany] = React.useState(1);
  const handleChange = (event) => {
    const appNo = event.target.value;
    setCompany(appNo);
    setSelectedAppNo(appNo);
  };
  const send_app_no = (number) => {
    console.log(`Selected App No: ${number}`);
  };
  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={company}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select company" }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        "&.MuiList-root": {
          p: "8px",
        },
        [`& .${selectClasses.select}`]: {
          display: "flex",
          alignItems: "center",
          gap: "2px",
          pl: 1,
        },
      }}
    >
      {/* <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader> */}
      <MenuItem value={1} onClick={() => send_app_no(1)}>
        <ListItemAvatar>
          <Avatar alt="App 1">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Primary App" secondary="App 1" />
      </MenuItem>
      <MenuItem value={2} onClick={() => send_app_no(2)}>
        <ListItemAvatar>
          <Avatar alt="App 2">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Secondary App" secondary="App 2" />
      </MenuItem>
      {/* <MenuItem value={20}>
        <ListItemAvatar>
          <Avatar alt="Sitemark Store">
            <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sitemark-Store" secondary="Web app" />
      </MenuItem> */}
    </Select>
  );
}
