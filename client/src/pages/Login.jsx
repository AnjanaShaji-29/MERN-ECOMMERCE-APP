import React, { useState } from 'react'; 
import styled from 'styled-components';
import { mobile } from '../Responsive';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

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
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background: white;
    ${mobile( {width: "75%"})}
`;

const Title = styled.h1`
    font-size: 24px;
    font-wight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;


const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    background: teal;
    color: white;
    padding: 15px 20px;
    margin-bottom: 10px;
    cursor: pointer;
    &:disabled {
        color:green;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`;

const Login = () => {
    const [username, setUsername] = useState(""); // username
    const [password, setPassword] = useState(""); // password
    const dispatch = useDispatch(); 
    const {isFetching, error} = useSelector((state) => state.user); 

    const handleCLick = (e) => {
        e.preventDefault(); // Preventing the page from reloading while login button click
        login(dispatch, { username, password }); // Sending the username & password to login function in apiCalls.js
    }

  return (
    <Container>
         <Wrapper>
            <Title> SIGN IN </Title>
            <Form>
                <Input placeholder='name' onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder='password' type='password'  onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleCLick} disabled={isFetching}> LOGIN </Button>
               {  error && <Error> Something went wrong ... </Error>}
                <Link> DON'T YOU REMEMBER THE PASSWORD ? </Link>
                <Link> CREATE A NEW ACCOUNT </Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login;