// https://chatgpt.com/share/68375845-4468-800b-8107-d75e72794131
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "./storageUtils";
import "./StorageExample.css";

export default function StorageExample() {
  const [localValue, setLocalValue] = useState("");
  const [sessionValue, setSessionValue] = useState("");
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    setLocalValue(localStorage.getItem("myLocalKey") || "");
    setSessionValue(sessionStorage.getItem("mySessionKey") || "");
    setCookieValue(getCookie("myCookie") || "");
  }, []);

  const updateLocal = (val: string) => {
    localStorage.setItem("myLocalKey", val);
    setLocalValue(val);
  };

  const updateSession = (val: string) => {
    sessionStorage.setItem("mySessionKey", val);
    setSessionValue(val);
  };

  const updateCookie = (val: string) => {
    setCookie("myCookie", val, 7);
    setCookieValue(val);
  };

  return (
  <div className="container">
    <h1>React Storage Demo</h1>

    <div className="card-container">
      <div className="card">
        <h2>Local Storage</h2>
        <input
          value={localValue}
          onChange={e => updateLocal(e.target.value)}
          placeholder="Set localStorage"
        />
        <p><strong>Stored:</strong> {localValue}</p>
      </div>

      <div className="card">
        <h2>Session Storage</h2>
        <input
          value={sessionValue}
          onChange={e => updateSession(e.target.value)}
          placeholder="Set sessionStorage"
        />
        <p><strong>Stored:</strong> {sessionValue}</p>
      </div>

      <div className="card">
        <h2>Cookies</h2>
        <input
          value={cookieValue}
          onChange={e => updateCookie(e.target.value)}
          placeholder="Set cookie"
        />
        <p><strong>Stored:</strong> {cookieValue}</p>
      </div>
    </div>
  </div>
);
}
