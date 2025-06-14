import { Routes, Route, Link } from "react-router-dom";
import StorageExample from "./components/StorageExample";
import "./App.css";
import CidrGuessGame from "./components/CidrGuessGame";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/github-pages-example/" element={<Landing />} />
        <Route path="/github-pages-example/storage" element={<StorageExample />} />
        <Route path="/github-pages-example/cidr-game" element={<CidrGuessGame />} />
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
      <Link to="/github-pages-example/storage">
        <button>Open Storage Example</button>
      </Link>
      <Link to="/github-pages-example/cidr-game">
        <button>CIDR game</button>
      </Link>
    </div>
  );
}
