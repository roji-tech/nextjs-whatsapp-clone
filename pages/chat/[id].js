import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  where,
  addDoc,
  query,
  orderBy
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { getRecipientStripedEmail } from "../../utils/getRecipientEmail";

const SingleChat = ({ chat, messages }) => {
  chat = JSON.parse(chat);
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientStripedEmail(chat?.users, user);

  return (
    <Container>
      <Head>
        <title>Chat with {recipientEmail}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default SingleChat;

export const getServerSideProps = async (context) => {
  const chatRef = doc(db, "chats", context.query.id);

  // const messageRes = await chatRef
  //   .collection("messages")
  //   .orderBy("timestamp", "asc")
  //   .get();
  // import { query, orderBy } from "firebase/firestore";

  // const q = query(citiesRef, orderBy("state"), orderBy("population", "desc"));
  const msgRef = await getDocs(collection(chatRef, "messages"),  orderBy("timestamp", "asc"));


  const messages = msgRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime()
    }));

  const chatRes = await getDoc(chatRef);
  let chat = {};

  if (chatRes.exists()) {
    chat = { id: chatRes?.id, users: chatRes?.data().users, ...chatRes };
  } else {
    console.log("No such document!");
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: JSON.stringify(chat)
    }
  };
};

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 99.9vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
