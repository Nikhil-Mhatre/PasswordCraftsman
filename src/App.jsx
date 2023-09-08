import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [passLength, setPassLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumberAllowed, setNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [isCopied, setIsCopied] = useState("Copy");
  const [makeBump, setMakeBump] = useState(false);
  const passInput = useRef();

  const GeneratePassword = useCallback(
    (passLength) => {
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const specialChar = "!@#$%^&*";
      const numbers = "0123456789";
      let password = "";
      if (isNumberAllowed) str += numbers;
      if (isSpecialCharAllowed) str += specialChar;

      for (let index = 0; index < passLength; index++) {
        let random = Math.floor(Math.random() * str.length + 1);
        password += str.charAt(random);
      }
      console.log(password);
      setPassword(password);
    },
    [passLength, isNumberAllowed, isSpecialCharAllowed]
  );

  useEffect(() => {
    GeneratePassword(passLength);
  }, [passLength, isNumberAllowed, isSpecialCharAllowed]);

  useEffect(() => {
    const Timer = setTimeout(() => {
      setIsCopied("Copy");
    }, 1000);
    return () => {
      clearTimeout(Timer);
    };
  }, [isCopied]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMakeBump(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [passLength]);

  const copyToClipboard = () => {
    setIsCopied("Copied");
    navigator.clipboard.writeText(passInput.current.value);
  };

  return (
    <div
      className="flex flex-col gap-2
     bg-customBackgroundColor justify-center 
     items-center min-h-screen"
    >
      <h1
        className="text-customTextColor font-bold 
      font-yeseva-One text-xl sm:text-4xl"
      >
        Password Craftsman
      </h1>
      <div
        className="font-josefin-Sans flex flex-col p-6 bg-gray-700
       bg-opacity-30  border border-gray-200 rounded-lg shadow-2xl"
      >
        {/* Read-Only Inputs */}
        <div className="flex flex-col sm:flex-row gap-1">
          <input
            readOnly
            ref={passInput}
            value={password}
            className="border-2 sm:w-[400px] 
            rounded-md px-4 py-2 text-customTextColor 
            font-semibold outline-none"
            type="text"
          />
          <button
            onClick={copyToClipboard}
            className={`
            ${isCopied === "Copied" && "bg-green-600"}
            cursor-pointer border-2 sm:w-[100px]
            hover:bg-customPrimaryColor rounded-md
            px-4 py-2 text-white font-semibold`}
          >
            {isCopied}
          </button>
        </div>
        {/* Actions Inputs */}
        <div className="flex flex-col mt-4 gap-1 justify-center items-start ">
          <div className="flex flex-row gap-2">
            <input
              type="range"
              min={8}
              max={20}
              value={passLength}
              id="length"
              onChange={(e) => {
                setPassLength(e.currentTarget.value);
                setMakeBump((prevVal) => !prevVal);
              }}
            />
            <label className="relative" htmlFor="length">
              Length:
              <span
                className={
                  makeBump
                    ? "text-xl text-customSecondaryColor font-bold transition-all duration-150 ease-in-out absolute bottom-0"
                    : "absolute "
                }
              >
                {passLength}
              </span>
            </label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="numbers"
              onChange={() => {
                setNumberAllowed((prevVal) => !prevVal);
              }}
            />
            <label htmlFor="numbers">Number</label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="specialChars"
              onChange={() => {
                setSpecialCharAllowed((prevVal) => !prevVal);
              }}
            />
            <label htmlFor="specialChars">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
