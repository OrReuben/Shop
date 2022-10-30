// import { Add, Remove } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Redux/cartRedux";
import Clock from "../Components/Clock";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  margin: 5px 0px;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 30px 0px;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;

  &:active {
    border: 1px solid green;
  }
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const PriceContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
`;

const BidContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;
const BidButton = styled.button`
  padding: 15px;
  margin: 10px 0px;
  font-size: 15px;
  border-radius: 20%;
  background-color: #000000f3;
  opacity: 0.9;
  color: white;
  cursor: pointer;
  font-weight: 500;

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }

  &:hover {
    opacity: 1;
  }
`;
const Input = styled.input`
  min-width: 40%;
  margin: 20px 5px;
  padding: 10px;
  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

const LastBidder = styled.h2`
  margin: 5px 12px 2px;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [newBid, setNewBid] = useState(0);
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [auctionError, setAuctionError] = useState(false);
  const [sameUserError, setSameUserError] = useState(false);
  const [timeCounter, setTimeCounter] = useState("Loading...");

  useEffect(() => {
    let isMounted = true;
    const getProduct = async () => {
      if (isMounted) {
        try {
          const res = await publicRequest.get("/products/find/" + id);
          setProduct(res.data);
        } catch (err) {}
      }
    };
    getProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // const handleQuantity = (type) => {
  //   if (type === "dec") {
  //     quantity > 1 && setQuantity(quantity - 1);
  //   } else {
  //     setQuantity(quantity + 1);
  //   }
  // };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  let user = "";
  const check = useSelector((state) => state.user.currentUser);
  check !== null ? (user = check) : (user = "");

  const handleBid = async () => {
    if (timeCounter !== "THE AUCTION HAS ENDED") {
      if (product.posterUsername !== user.username) {
        if (user !== "") {
          const newBidPut = {
            bidPrice: newBid,
            bidderUsername: user.username,
          };
          if (newBid >= 1.1 * product.bidPrice) {
            await publicRequest
              .put(`/products/${product._id}`, newBidPut)
              .then(setError(false));
            window.location.reload();
          } else {
            setError(true);
          }
        } else setUserError(true);
      } else setSameUserError(true);
    } else setAuctionError(true);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <PriceContainer>
            <Price>
              <b> Buy Now: </b> $ {product.price}
            </Price>
            <Hr />
            <Price>
              <b> Bid: </b> $ {product.bidPrice}
            </Price>
          </PriceContainer>
          <LastBidder>Last bidder: {product.bidderUsername}</LastBidder>
          <LastBidder>Poster: {product.posterUsername}</LastBidder>
          <Clock
            endAuction={product.endAuction && product.endAuction}
            timeLeft={product.timeLeft && product.timeLeft}
            setTimeCounter={setTimeCounter}
            timeCounter={timeCounter}
            product={product}
          />
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((size) => (
                  <FilterSizeOption key={size}>{size}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              {/* <Remove
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("dec")}
              /> */}
              <Amount>{quantity}</Amount>
              {/* <Add
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("inc")}
              /> */}
            </AmountContainer>
            {(product.status === "ENDED") &
            (product.bidderUsername === user.username) ? (
              <Button onClick={handleClick}>ADD TO CART</Button>
            ) : (
              product.status === "ONGOING" && (
                <Button onClick={handleClick}>ADD TO CART</Button>
              )
            )}
          </AddContainer>
          <BidContainer>
            <Input
              onChange={(e) => setNewBid(e.target.value)}
              type="number"
              placeholder="Place your bid.."
            />
            <BidButton
              onClick={handleBid}
              disabled={timeCounter === "Loading..."}
            >
              BID
            </BidButton>
          </BidContainer>
          {error && (
            <>
              <Error>Bid must be higher!</Error>
            </>
          )}
          {userError && (
            <>
              <Error>You must log in to bid!</Error>
            </>
          )}
          {auctionError && (
            <>
              <Error>The auction has already ended!</Error>
            </>
          )}
          {sameUserError && (
            <>
              <Error>Poster can't make bids!</Error>
            </>
          )}
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
