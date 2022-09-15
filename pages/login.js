import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@mui/material";
import logoImg from "../imgs/was.svg";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const SignIn = () => {
    // provider.addScope('profile');
    // // provider.addScope('email');
    signInWithPopup(auth, provider).catch(alert);
    // // The signed-in user info.
    // const user = result.user;
    // This gives you a Google Access Token.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src={logoImg} width={200} height={200} alt="WHATSAPP" />
        <Button onClick={SignIn}>SIGN IN WITH GOOGLE</Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  flex-direction: column;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 100px;
  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.5);
  /* justify-content: center; */

  @media screen and (max-width: 600px) {
    padding: 15%;
  }
`;

const Logo = styled(Image)`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;

  &&& {
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
    /* background-color: white; */
  }
`;
