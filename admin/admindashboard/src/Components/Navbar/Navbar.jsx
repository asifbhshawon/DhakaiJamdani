import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { Link } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const items = [
    { text: "Home", icon: <HomeIcon />, link: "/home" },
    { text: "Add a Product", icon: <AddCardRoundedIcon />, link: "/" },
    { text: "Products", icon: <CategoryRoundedIcon />, link: "/products" },
    { text: "Send email", icon: <SendIcon /> },
    { text: "Drafts", icon: <DraftsIcon /> },
  ];

  const bottom_item = [
    { text: "Inbox", icon: <MailOutlineIcon /> },
    { text: "All mail", icon: <InboxIcon /> },
    { text: "Trash", icon: <DeleteIcon /> },
    { text: "Spam", icon: <ReportIcon /> },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {items.map(({ text, icon, link }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={link}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottom_item.map(({ text, icon }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="menu-container">
      <React.Fragment key={"left"}>
        <IconButton color="primary" onClick={toggleDrawer("left", true)}>
          <MenuIcon color="primary" /> Menu
        </IconButton>
        <Typography color="white" variant="button" sx={{mt:0}}>
          Dhakai Jamdani
        </Typography>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
