import { useEffect, useState } from "react";
const useRandomPassword = (formState) => {
  const [password, setPassword] = useState("");
  useEffect(() => {
    let chars = `qwertyuiopasdfghjklzxcvbnmAQWERTYUIOPSDFGHJKLZXCVBNM1234567890!@#$%^&*()_+`;

    let lengthOfPass = 12;
    let pass = "";
    for (let i = 0; i < lengthOfPass; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }, [formState]);

  return { password };
};
export default useRandomPassword;
