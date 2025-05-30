import { Routes, Route, Link } from "react-router-dom";
import StorageExample from "./StorageExample";
import "./App.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/storage" element={<StorageExample />} />
        {/* You can add more routes like below */}
        {/* <Route path="/other" element={<OtherComponent />} /> */}
      </Routes>
    </div>
  );
}

function Landing() {
  return (
    <div className="landing">
      <h1>Welcome to the React Demo App</h1>
      <Link to="/storage">
        <button>Open Storage Example</button>
      </Link>
    </div>
  );
}
