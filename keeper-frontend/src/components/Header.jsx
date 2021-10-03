import React from "react";
import { Link } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header>
      <ul id="menu">
        <li>
          <div>
            <Link to="/MainPage">
              <h1>
                <LightbulbIcon />
                Keeper
              </h1>
            </Link>
          </div>
        </li>

        <li>
          <div className="LogInButton">
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <h1>
                <AccountCircleIcon fontSize="large" />
              </h1>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link to="SignUp">
                <MenuItem onClick={handleClose}>SignUp</MenuItem>
              </Link>
              <Link to="/">
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Link>
            </Menu>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
