import { Input } from "../ui/input";

import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
export default function PassInput({ field }) {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-end">
      <Input
        type={showPass ? "text" : "password"}
        className="shad-input"
        placeholder={"Enter your user Password "}
        {...field}
      />
      <button
        className="absolute h-5 w-6"
        type="button"
        onClick={() => setShowPass((show) => !show)}
      >
        {showPass ? <FaEyeSlash /> : <IoEyeSharp />}
      </button>
    </div>
  );
}
