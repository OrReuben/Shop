import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../Redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: gray;
    font-weight: 700;
    cursor: not-allowed;
  }
`;

const HomeButton = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: gray;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const LinkContainer = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  cursor: pointer;

  a {
    text-decoration: none;
    font-weight: 600;
    transition: 0.1s;

    &:hover {
      font-weight: 700;
    }
  }
`;

const Error = styled.span`
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <>
      {" "}
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonContainer>
              <Button
                onClick={handleClick}
                disabled={
                  username.length === 0 || password.length === 0 || isFetching
                }
              >
                LOGIN
              </Button>
              <HomeButton onClick={() => navigate("/")}>BACK HOME..</HomeButton>
            </ButtonContainer>
            {error && <Error>Something went wrong...</Error>}
            <LinkContainer>
              <Link to="/register">CREATE A NEW ACCOUNT</Link>
            </LinkContainer>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
