import { Routes, Route, Link } from "react-router-dom";
import StorageExample from "./StorageExample";
import "./App.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/github-pages-example/" element={<Landing />} />
        <Route path="/github-pages-example/storage" element={<StorageExample />} />
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
    </div>
  );
}
