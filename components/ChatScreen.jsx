import { useState, useRef } from "react";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  where,
  query,
  setDoc,
  orderBy
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail, { getRecipientStripedEmail } from "../utils/getRecipientEmail";
import Message from "./Message";

const ChatScreen = ({ chat, messages }) => {
  const [input, setInput] = useState("");
  const lastMessageRef = useRef();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const recipientStripedEmail = getRecipientStripedEmail(chat?.users, user);
  const recipientEmail = getRecipientEmail(chat?.users, user);
  const [messagesSnapShot] = useCollection(
    query(
      collection(doc(db, "chats", router.query.id), "messages"),
      orderBy("timestamp", "asc")
    )
  );

  const recipientSnapshot = useCollection(
    query(
      collection(db, "users"),
      where("email", "==", recipientEmail)
    )
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const scrollToBottom = () => {
    lastMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const showMessages = () => {
    if (messagesSnapShot) {
      return messagesSnapShot.docs.map((message) => (
        <Message
          key={message?.id}
          user={message?.data()?.user}
          message={{
            message: message?.data().message,
            timestamp: message?.data().timestamp?.toDate().getTime()
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message?.id} user={message?.user} message={message} />
      ));
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    await setDoc(
      doc(db, "users", user.uid),
      ({
        lastSeen: serverTimestamp()
      },
      { merge: true })
    );

    await addDoc(collection(doc(db, "chats", router.query.id), "messages"), {
      user: user.email,
      timestamp: serverTimestamp(),
      message: input,
      photoURL: user.photoURL
    });

    setInput("");
    scrollToBottom();
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoUrl} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInfo>
          <h3>{recipientStripedEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last Seen{" "}
              {recipient?.lastSeen?.toDate()
                ? recipient?.lastSeen?.toDate()
                : "Unavailable"}
            </p>
          ) : (
            <p>Loading Last Active...</p>
          )}
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={lastMessageRef} />
      </MessageContainer>
      <InputContainer>
        <div>
          <InsertEmoticon />
          <Input placeholder="type your message" value={input} onChange={(e) => setInput(e.target.value)} />
          <Mic />
          <button hidden disabled={!input} type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </div>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 5px;
  }

  > p {
    font-size: 14px;
    color: grey;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div`
  margin-bottom: 25px;
`;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 17px;
  font-size: 1.1em;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  z-index: 100;
  outline: 0;
  border: 0;
  border-radius: 20px;
  margin: 0 15px;
  `;
  
const InputContainer = styled.form`
  padding: 5px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;

  >div {
    display: flex;
    background-color: whitesmoke;
    padding: 6px;
    align-items: center;
    border-radius: 20px;
    }
`;
