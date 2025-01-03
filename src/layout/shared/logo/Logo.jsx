import { styled } from "@mui/material";
import logo from "../../../assets/receipt/ag_logo.png";
import { Link } from "react-router-dom";
const LinkStyled = styled(Link)(() => ({
  height: "63px",
  width: "220px",
  overflow: "hidden",
  display: "block",
}));
const LargeLinkStyled = styled(Link)(() => ({
  height: "63px",
  width: "70px",
  overflow: "hidden",
  display: "block",
}));

const Logo = ({ isCollapsed }) => {
  return (
    <>
      {!isCollapsed ? (
        <LinkStyled to="/home">
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="h-16"  />
          </div>
        </LinkStyled>
      ) : (
        <LargeLinkStyled to="/home">
          <img src={logo} alt="logo" className="h-16"  />
        </LargeLinkStyled>
      )}
    </>
  );
};

export default Logo;
