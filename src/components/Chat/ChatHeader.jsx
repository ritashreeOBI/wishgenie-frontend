import { hideChatBox } from "@/store/slices/chatInteraction";
import { useRouter } from "next/router";
import React,{useState} from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
function ChatHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(false);
  
  React.useEffect(() => {
    if (window.innerWidth < 640) {
      setShowBtn(true);
    }
  }, []);
  const toggleHandler = () => {
    dispatch(hideChatBox());
  };
  return (
    <div className=" relative">
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 390"
        xmlns="http://www.w3.org/2000/svg"
        className="-mt-[5%]"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#83caf9" />
            <stop offset="95%" stopColor="#2083c3" />
          </linearGradient>
        </defs>
        <path
          d="M 0,400 C 0,400 0,200 0,200 C 93.97129186602868,192.69856459330143 187.94258373205736,185.39712918660285 279,188 C 370.05741626794264,190.60287081339715 458.2009569377991,203.11004784688996 548,206 C 637.7990430622009,208.88995215311004 729.2535885167464,202.16267942583733 840,195 C 950.7464114832536,187.83732057416267 1080.7846889952154,180.23923444976074 1184,181 C 1287.2153110047846,181.76076555023926 1363.6076555023924,190.88038277511964 1440,200 C 1440,200 1440,400 1440,400 Z"
          stroke="none"
          strokeWidth={0}
          fill="url(#gradient)"
          fillOpacity={1}
          className=" path-0 "
          transform="rotate(-180 720 200)"
        />
      </svg>
      <div className="flex">
        <p
          className={` ${
            router.pathname === `/products/${router.query.productID}/customize`
              ? "text-[16px] top-6"
              : ""
          } chat-title text-white text-3xl text-center font-thin  absolute top-8  w-full  chat-title `}
        >
          Your Wish Is My Command
        </p>
        {router.pathname === "/products" && showBtn ? (
          <MdOutlineKeyboardDoubleArrowLeft
            onClick={toggleHandler}
            className="fixed top-[6px] right-[6px] text-[30px] text-slate-50 hover:cursor-pointer hover:bg-slate-100 rounded-full p-1 hover:text-slate-600 transition-all"
          />
        ) : null}
      </div>
    </div>
  );
}

export default ChatHeader;
