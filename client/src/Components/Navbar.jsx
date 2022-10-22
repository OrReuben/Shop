import { Badge } from "@material-ui/core";
import {
  Add,
  DashboardRounded,
  ExitToApp,
  Search,
  ShoppingCartOutlined,
  VerifiedUser,
  VpnKey,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  z-index: 5;
  background-color: white;
  overflow-x: hidden ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  ${mobile({ justifyContent: "center" })}
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 2;
  text-align: center;
  ${mobile({ flex: 1 })}
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "24px", marginLeft: "50px" })}
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  ${mobile({ display: "none" })}
`;
const MenuItemCart = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuText = styled.div`
  font-size: 14px;
  margin-left: 25px;
  text-align: center;
  ${mobile({ display: "none" })}
`;

const PhoneIcon = styled.span`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin: 0px 10px;
  display: none;
  ${mobile({ display: "flex" })}
`;
const PhoneIconText = styled.span`
  margin-top: 5px;
  font-size: 8px;
  font-weight: 700;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = async () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("persist:root");
    navigate("/");
    window.location.reload();
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search.." autoFocus />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
          {user && (
            <>
              <MenuItem onClick={() => navigate("/myauctions")}>
                DASHBOARD
              </MenuItem>
              <PhoneIcon onClick={() => navigate("/myauctions")}>
                <DashboardRounded />
                <PhoneIconText>DASHBOARD</PhoneIconText>
              </PhoneIcon>
            </>
          )}
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")}>BidIt</Logo>
        </Center>
        <Right>
          {!user ? (
            <>
              <MenuItem onClick={() => navigate("/register")}>
                REGISTER
              </MenuItem>
              <PhoneIcon onClick={() => navigate("/register")}>
                <VpnKey />
                <PhoneIconText>REGISTER</PhoneIconText>
              </PhoneIcon>

              <MenuItem onClick={() => navigate("/login")}>SIGN IN</MenuItem>
              <PhoneIcon onClick={() => navigate("/login")}>
                <VerifiedUser />
                <PhoneIconText>SIGN IN</PhoneIconText>
              </PhoneIcon>
            </>
          ) : (
            <>
              <MenuText>WELCOME {user.username.toUpperCase()}</MenuText>
              <MenuItem onClick={() => navigate("/auction")}>AUCTIONS</MenuItem>
              <PhoneIcon onClick={() => navigate("/auction")}>
                <Add />
                <PhoneIconText>AUCTIONS</PhoneIconText>
              </PhoneIcon>
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
              <PhoneIcon onClick={handleLogout}>
                <ExitToApp />
                <PhoneIconText>LOGOUT</PhoneIconText>
              </PhoneIcon>
            </>
          )}
          <Link to="/cart">
            <MenuItemCart>
              <Badge
                overlap="rectangular"
                badgeContent={quantity}
                color="primary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItemCart>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
