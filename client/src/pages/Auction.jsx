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
  const user = useSelector((state) => state.user.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      img,
      categories: categories.toLowerCase().split(' '),
      size: size.toUpperCase().split(' '),
      color: color.toLowerCase().split(' '),
      price,
      bidPrice,
      bidderUsername: "None",
      posterUsername: user.username,
    };
    console.log(newPost);
    userRequest.post("/products", newPost).then(() => navigate("/products"));
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
            onChange={(e) => setBidPrice(e.target.value)}
          />
          <Input
            placeholder="Buy Now Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Agreement>
            By creating a post, I consent to the processing of my personal data
            in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonContainer>
            <Button>CREATE</Button>
            <HomeButton onClick={() => navigate("/")}>BACK HOME..</HomeButton>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Auction;
