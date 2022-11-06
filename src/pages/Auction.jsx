import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods.js";
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
  ${mobile({ padding: "10px 0px" })}
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 51%;
  background-color: white;
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

  a {
    text-decoration: none;
    font-weight: 600;
    transition: 0.1s;

    &:hover {
      font-weight: 700;
    }
  }
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
    padding: "1px",
    fontSize: "12px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })}
`;

const Error = styled.span`
  color: red;
  padding-top: 5px;

  ${mobile({ fontSize: "12px" })}
`;

const Suggestion = styled.div`
  padding-top: 5px;
  color: gold;
  ${mobile({ fontSize: "12px", paddingTop: "10px" })}
`;

const Auction = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [bidPrice, setBidPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [endAuction, setEndAuction] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const [validationError, setValidationError] = useState({});
  const [suggestions, setSuggestions] = useState({});

  const endTimeInMS = Date.parse(endAuction);
  const TimeInMS = Date.parse(new Date());
  const timeLeft = endTimeInMS - TimeInMS;

  useEffect(() => {
    if (categories.length === 1) {
      setSuggestions({
        status: true,
        messege: "You can set more than one category using space",
      });
    } else if (size.length === 1) {
      setSuggestions({
        status: true,
        messege: "You can set more than one size using space",
      });
    } else if (color.length === 1) {
      setSuggestions({
        status: true,
        messege: "You can set more than one color using space",
      });
    } else {
      setSuggestions({
        status: false,
      });
    }
  }, [categories, size, color]);

  useEffect(() => {
    if (title.length !== 0 && title.length < 2) {
      setValidationError({
        status: true,
        messege: "Title must be valid!",
      });
    } else if (desc.length !== 0 && desc.length < 2) {
      setValidationError({
        status: true,
        messege: "Description must be valid!",
      });
    } else if (img.length !== 0 && img.length < 2) {
      setValidationError({
        status: true,
        messege: "Image link must be valid!",
      });
      // } else if (bidPrice.length !== 0 && bidPrice > price) {
      //   setValidationError({
      //     status: true,
      //     messege: "Starting bid price must be smaller than the buy now price!",
      //   });
      // } else if (price.length !== 0 && price < bidPrice) {
      //   setValidationError({
      //     status: true,
      //     messege: "Buy now price must be higher than the starting bid price!",
      //   });
    } else if (endTimeInMS < TimeInMS) {
      setValidationError({
        status: true,
        messege: "Please select a valid date!",
      });
    } else if (endTimeInMS < TimeInMS) {
      setValidationError({
        status: true,
        messege: "Please select a valid date!",
      });
    } else {
      setValidationError({
        status: false,
      });
    }
  }, [title, desc, img, bidPrice, price, endTimeInMS, TimeInMS]);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
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
      publicRequest.post("/products", newPost).then(() => console.log(newPost));
    } catch {}
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
            defaultValue={new Date()}
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
                validationError.status ||
                isNaN(endTimeInMS)
              }
            >
              CREATE
            </Button>
            <HomeButton onClick={() => navigate("/")}>BACK HOME..</HomeButton>
          </ButtonContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {suggestions.status && (
              <Suggestion>{suggestions.messege}</Suggestion>
            )}
            {validationError.status && <Error>{validationError.messege}</Error>}
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Auction;
