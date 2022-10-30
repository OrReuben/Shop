import {
  Check,
  Clear,
  PostAdd,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { addProduct } from "../Redux/cartRedux";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fff1ff;
  overflow: hidden;
`;
const Wrapper = styled.div`
  width: 85%;
  background-color: RGB(223, 207, 190);
  border-radius: 5%;
  padding: 1% 5% 5% 5%;
  margin: 10px 10px;
  ${mobile({ padding: "1% 3% 3% 3%" })}
`;
const DashboardContainer = styled.div`
  height: 100%;
  width: 100%;
`;
const DashboardText = styled.h1`
  text-align: center;
  padding: 10px 0px;
  ${mobile({ fontSize: "20px" })}
`;
const DashboardTableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const DashboardTable = styled.table`
  border-collapse: collapse;
  width: 95%;
`;
const DashboardTableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgb(226, 203, 178);
  }
`;
const DashboardTableHeaders = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  text-align: center;
  ${mobile({ fontSize: "9px" })}
`;
const DashboardTableContent = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  text-align: center;
  ${mobile({ fontSize: "9px" })}
`;
const TableImage = styled.img`
  width: 100px;
  height: 90px;
  ${mobile({ width: "50px", height: "45px" })}
`;
const TableProduct = styled.h4``;
const TableCurrentBid = styled.span``;
const TableLatestBidder = styled.span``;
const Error = styled.h4`
  color: red;
  text-align: center;
`;
const TableIcon = styled.i`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  cursor: pointer;
`;

const TableStatus = styled.span`
  color: ${(props) => props.color};
  font-weight: 700;
  border-radius: 10%;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;

  &:hover {
    border: 1px solid black;
  }
`;

const IconText = styled.span`
  margin-top: 10px;
  font-size: 8px;
  font-weight: 700;
`;

const Links = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  padding-bottom: 10px;
`;

const LinkText = styled.a`
  text-decoration: underline;
  text-underline-position: under;
  color: white;
  font-weight: 700;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: black;
  }
`;

const Hr = styled.hr`
  margin: 50px;
  background-color: #eee;
  border: none;
  height: 3px;
`;
const MyAuctions = () => {
  const [product, setProduct] = useState({});
  const [repostProduct, setRepostProduct] = useState({});
  const [myAuctions, setMyAuctions] = useState([]);
  const [biddedAuctions, setBiddedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBids, setLoadingBid] = useState(true);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleRemove = async (id) => {
    try {
      await userRequest
        .delete(`/products/${id}`)
        .then(() => window.location.reload());
    } catch {
      return error;
    }
  };

  const TimeInMS = Date.parse(new Date());

  const handleRepost = async (id) => {
    try {
      await userRequest
        .get("/products/find/" + id)
        .then((res) => setRepostProduct(res.data));
      if (!isNaN(repostProduct.timeLeft)) {
        await userRequest
          .put(`/products/${id}`, {
            status: "ONGOING",
            endAuction: TimeInMS + repostProduct.timeLeft,
          })
          .then((res) => console.log(res.data));
        window.location.reload();
      } else setError(true);
    } catch {
      return error;
    }
  };

  const handleClick = async (id) => {
    try {
      if (product) {
        const quantity = 1;
        const color = "red";
        const size = "XS";
        await userRequest
          .get("/products/find/" + id)
          .then((res) => setProduct(res.data));
        if (product.img) {
          dispatch(addProduct({ ...product, quantity, color, size }));
        }
      }
    } catch {}
  };

  useEffect(() => {
    let isMounted = true;
    const getMyAuctions = async () => {
      if (isMounted) {
        try {
          await userRequest
            .get(`/products/get/${user.username}`)
            .then((res) => setMyAuctions(res.data));
          setLoading(false);
        } catch {
          setLoading(false);
        }
      }
    };
    getMyAuctions();
    const getMyBids = async () => {
      if (isMounted) {
        try {
          await userRequest
            .get(`/products/gets/${user.username}`)
            .then((res) => setBiddedAuctions(res.data));
          setLoadingBid(false);
        } catch {
          setLoadingBid(false);
        }
      }
    };
    getMyBids();
    return () => {
      isMounted = false;
    };
  }, [user]);
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Links>
            <LinkText href="#auctions">YOUR AUCTIONS</LinkText>
            <LinkText href="#win">AUCTIONS YOU'VE BID</LinkText>
          </Links>
          <DashboardText id="auctions">YOUR AUCTIONS</DashboardText>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <DashboardContainer>
              <DashboardTableContainer>
                {myAuctions.length === 0 ? (
                  <Error>You have no auctions running!</Error>
                ) : (
                  <DashboardTable>
                    <>
                      <tbody>
                        <DashboardTableRow>
                          <DashboardTableHeaders>
                            Product Image
                          </DashboardTableHeaders>
                          <DashboardTableHeaders>
                            Product Name
                          </DashboardTableHeaders>
                          <DashboardTableHeaders>
                            Current Bid
                          </DashboardTableHeaders>
                          <DashboardTableHeaders>
                            Last Bidder
                          </DashboardTableHeaders>
                          <DashboardTableHeaders>Status</DashboardTableHeaders>
                          <DashboardTableHeaders>Actions</DashboardTableHeaders>
                        </DashboardTableRow>
                      </tbody>
                      <tbody>
                        {myAuctions.map((auction, index) => (
                          <DashboardTableRow key={auction._id}>
                            <DashboardTableContent>
                              <TableImage src={auction.img} />
                            </DashboardTableContent>
                            <DashboardTableContent>
                              <TableProduct>{auction.title}</TableProduct>
                            </DashboardTableContent>
                            <DashboardTableContent>
                              <TableCurrentBid>
                                $ {auction.bidPrice}
                              </TableCurrentBid>
                            </DashboardTableContent>
                            <DashboardTableContent>
                              <TableLatestBidder>
                                {auction.bidderUsername}
                              </TableLatestBidder>
                            </DashboardTableContent>
                            <DashboardTableContent>
                              <TableStatus
                                color={
                                  auction.status === "ONGOING"
                                    ? "orange"
                                    : "red"
                                }
                              >
                                {auction.status}
                              </TableStatus>
                            </DashboardTableContent>
                            <DashboardTableContent>
                              <TableIcon>
                                <Icon onClick={() => handleRemove(auction._id)}>
                                  <Clear style={{ fontSize: "15px" }} />
                                  <IconText>REMOVE</IconText>
                                </Icon>
                                {auction.status === "ENDED" &&
                                  (!error ? (
                                    <Icon
                                      onClick={() => handleRepost(auction._id)}
                                    >
                                      <PostAdd style={{ fontSize: "15px" }} />
                                      <IconText>REPOST</IconText>
                                    </Icon>
                                  ) : (
                                    <Icon
                                      onClick={() => handleRepost(auction._id)}
                                    >
                                      <Check style={{ fontSize: "15px" }} />
                                      <IconText>SUBMIT</IconText>
                                    </Icon>
                                  ))}
                              </TableIcon>
                            </DashboardTableContent>
                          </DashboardTableRow>
                        ))}
                      </tbody>
                    </>
                  </DashboardTable>
                )}
              </DashboardTableContainer>
            </DashboardContainer>
          )}
          <Hr />
          <DashboardText id="win">AUCTIONS YOU'VE BID</DashboardText>
          {loadingBids ? (
            <h1>Loading...</h1>
          ) : (
            <DashboardContainer>
              <DashboardTableContainer>
                {biddedAuctions.length === 0 ? (
                  <Error>You have no auctions running!</Error>
                ) : (
                  <DashboardTable>
                    <>
                      <tbody>
                        <DashboardTableRow>
                          <DashboardTableHeaders>
                            Product Image
                          </DashboardTableHeaders>
                          <DashboardTableHeaders>
                            Product Name
                          </DashboardTableHeaders>
                          <DashboardTableHeaders>To Pay</DashboardTableHeaders>
                          <DashboardTableHeaders>Actions</DashboardTableHeaders>
                        </DashboardTableRow>
                      </tbody>
                      <tbody>
                        {biddedAuctions.map((auction) => (
                          <DashboardTableRow key={auction._id}>
                            <DashboardTableContent>
                              <TableImage src={auction.img} />
                            </DashboardTableContent>
                            <DashboardTableContent>
                              <TableProduct>{auction.title}</TableProduct>
                            </DashboardTableContent>
                            <DashboardTableContent>
                              <TableCurrentBid>
                                $ {auction.bidPrice}
                              </TableCurrentBid>
                            </DashboardTableContent>

                            <DashboardTableContent>
                              {auction.status === "ENDED" ? (
                                <TableIcon>
                                  <Icon
                                    onClick={() => handleClick(auction._id)}
                                  >
                                    <ShoppingCartOutlined
                                      style={{ fontSize: "15px" }}
                                      onClick={() => handleRemove(auction._id)}
                                    />
                                    <IconText>CART</IconText>
                                  </Icon>
                                </TableIcon>
                              ) : (
                                <TableCurrentBid>
                                  Auction <br /> hasn't <br /> ended
                                </TableCurrentBid>
                              )}
                            </DashboardTableContent>
                          </DashboardTableRow>
                        ))}
                      </tbody>
                    </>
                  </DashboardTable>
                )}
              </DashboardTableContainer>
            </DashboardContainer>
          )}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default MyAuctions;
