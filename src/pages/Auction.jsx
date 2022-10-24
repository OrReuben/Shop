import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { userRequest } from "../requestMethods.js";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://c0.wallpaperflare.com/preview/620/421/213/gavel-auction-hammer-justice.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  ${mobile({ fontSize: "16px" })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 0px 0px;
  padding: 10px;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:disabled {
    color: gray;
  }
  ${mobile({
    padding: "5px",
    fontSize: "12px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 80vw;
`;
const HomeButton = styled.p`
  width: 30%;
  padding: 10px;
  text-align: center;
  border: none;
  background-color: gray;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  ${mobile({
    padding: "5px",
    fontSize: "12px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })}
`;

const Error = styled.span`
  text-align: center;
  color: red;
`;

const Auction = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [bidPrice, setBidPrice] = useState("");
  const [price, setPrice] = useState("");
  const [endAuction, setEndAuction] = useState("");
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const endTimeInMS = Date.parse(endAuction);
  const TimeInMS = Date.parse(new Date());
  const timeLeft = endTimeInMS - TimeInMS;

  console.log();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (endTimeInMS > TimeInMS) {
      const newPost = {
        title,
        desc,
        img,
        categories:
          categories.length > 0 && categories.toLowerCase().split(" "),
        size: size.length > 0 && size.toUpperCase().split(" "),
        color: color.length > 0 && color.toLowerCase().split(" "),
        price,
        bidPrice,
        bidderUsername: "None",
        posterUsername: user.username,
        endAuction,
        timeLeft,
        status: "ONGOING",
      };
      userRequest.post("/products", newPost).then(() => navigate("/products"));
    } else setError(true);
  };
  return (
    <Container>
      <Wrapper>
        <Title>POST A NEW PRODUCT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <Input
            placeholder="Image-URL"
            onChange={(e) => setImg(e.target.value)}
          />
          <Input
            placeholder="Categories"
            onChange={(e) => setCategories(e.target.value)}
          />
          <Input
            placeholder="Sizes"
            onChange={(e) => setSize(e.target.value)}
          />
          <Input
            placeholder="Colors"
            onChange={(e) => setColor(e.target.value)}
          />
          <Input
            placeholder="Starting Bid Price"
            type="number"
            onChange={(e) => setBidPrice(e.target.value)}
          />
          <Input
            placeholder="Buy Now Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            placeholder="End Time"
            type="datetime-local"
            onChange={(e) => setEndAuction(e.target.value)}
          />
          <Agreement>
            By creating a post, I consent to the processing of my personal data
            in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonContainer>
            <Button
              disabled={
                title.length === 0 ||
                desc.length === 0 ||
                img.length === 0 ||
                categories.length === 0 ||
                size.length === 0 ||
                color.length === 0 ||
                bidPrice.length === 0 ||
                price.length === 0 ||
                isNaN(endTimeInMS)
              }
            >
              CREATE
            </Button>
            <HomeButton onClick={() => navigate("/")}>BACK HOME..</HomeButton>
          </ButtonContainer>
          <Error>{error && "Please set a valid date"}</Error>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Auction;
