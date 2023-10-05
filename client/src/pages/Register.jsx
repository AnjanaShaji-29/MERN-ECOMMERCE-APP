import React from 'react';
import styled from 'styled-components';
import { mobile } from '../Responsive';

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
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 40%;
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
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    background: teal;
    color: white;
    padding: 15px 20px;
    cursor: pointer;
`;


const Register = () => {
  return (
    <Container> 
        <Wrapper>
            <Title> CRAETE AN ACCOUNT </Title>
            <Form>
                <Input placeholder='name' />
                <Input placeholder='last name' />
                <Input placeholder='username' />
                <Input placeholder='email' />
                <Input placeholder='password' />
                <Input placeholder='confirm password' />
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b> Privacy Policy </b>
                </Agreement>
                <Button> CREATE </Button>
            </Form>
        </Wrapper>
    
     </Container>
  )
}

export default Register;