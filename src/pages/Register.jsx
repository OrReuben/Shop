import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods.js";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0px;

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
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 80vw;
`;
const HomeButton = styled.p`
  width: 30%;
  text-align: center;
  border: none;
  padding: 15px 20px;
  background-color: gray;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({});


  useEffect(() => {
    if (name.length !== 0 && name.length === 1) {
      setValidationError({
        status: true,
        messege: "Must be a valid name!",
      });
    } else if (lastName.length !== 0 && lastName.length === 1) {
      setValidationError({
        status: true,
        messege: "Must be a valid last name!",
      });
    } else if (username.length !== 0 && username.length < 5) {
      setValidationError({
        status: true,
        messege: "Username must be atleast 5 characters!",
      });
    } else if (password.length !== 0 && password.length < 8) {
      setValidationError({
        status: true,
        messege: "Password must be atleast 8 characters!",
      });
    } else if (confirmPassword.length !== 0 && confirmPassword !== password) {
      setValidationError({
        status: true,
        messege: "Passwords do not match!",
      });
    } else
      setValidationError({
        status: false,
      });
  }, [name, lastName, username, password, confirmPassword]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    };
    publicRequest
      .post("/auth/register", newUser)
      .then(() => navigate("/login"));
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Agreement>
            Already have an account? <Link to="/login">Sign In</Link>
          </Agreement>

          <ButtonContainer>
            <Button
              disabled={
                name.length === 0 ||
                lastName.length === 0 ||
                email.length === 0 ||
                password.length === 0 ||
                confirmPassword.length === 0 ||
                validationError.status
              }
            >
              CREATE
            </Button>
            <HomeButton onClick={() => navigate("/")}>BACK HOME</HomeButton>
          </ButtonContainer>
          {validationError.status && <Error>{validationError.messege}</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
