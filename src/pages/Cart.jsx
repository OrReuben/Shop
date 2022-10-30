import { Clear } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../Redux/cartRedux";

const KEY =
  "pk_test_51LtvZ5JWUm7HFjJLxonnbfjYHYMBWjWRhWWUmnCRDGOYvSKNFEHcpwEQttloutwIZ1P4RsDf7X9S1EihfTVofEll00SfS0APd3";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  justify-content: flex-start;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  margin: 0px 10px;
  justify-content: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 10px;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-left: 10px;
`;

const SummaryTitle = styled.div`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const ColorWrapper = styled.div`
  display: flex;
`;
const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", {
          state: {
            data: res.data,
            cart: cart,
          },
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate, cart]);

  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const handleRemove = (index) => {
  // const newCart = cart.products.filter((product, i) => i !== index)
    // dispatch(removeProduct(index))
    // localStorage.setItem("cart", JSON.stringify(newCart));
    console.log(cart.products.filter((product, i) => i !== index));
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/products")}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping bag({quantity})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <div key={index}>
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ColorWrapper>
                        <b> Color: </b>
                        <ProductColor color={product.color} />
                      </ColorWrapper>
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>
                        Quantity: {product.quantity}
                      </ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>
                      ${" "}
                      {product.status === "ENDED"
                        ? product.bidPrice * product.quantity
                        : product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                  <DeleteButton>
                    <Clear
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemove(index)}
                    />
                  </DeleteButton>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {user ? (
              <StripeCheckout
                name="BidIt"
                image="https://t3.ftcdn.net/jpg/03/90/81/96/360_F_390819611_6ITIVeTZcHKqpmzYGfNYy5u7q6fJo5kl.jpg"
                billingAddress
                shippingAddress
                description={`Your total is  $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            ) : (
              <>
                <Button onClick={() => setError(true)}>CHECKOUT NOW</Button>
                {error && <Error>Please Login To Continue..</Error>}
              </>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
