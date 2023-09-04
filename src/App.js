import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import ShoppinglistAdd from "./ShoppinglistAdd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shoppinglist_add" element={<ShoppinglistAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
