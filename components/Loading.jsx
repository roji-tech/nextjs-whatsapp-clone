import Image from "next/image";
import Spinner1, { WhatsAppSpinner } from "./Spinner";
import logoImg from "../imgs/was.svg";

const Loading = () => {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Image
          src={logoImg}
          width={250}
          style={{ marginBottom: 4 }}
          height={250}
          alt="WHATSAPP"
        />
        <Spinner1 color={"#3CBC28"} size={50} />
      </div>
    </center>
  );
};

export default Loading;
