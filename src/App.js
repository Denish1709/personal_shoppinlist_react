import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import ShoppinglistAdd from "./ShoppinglistAdd";
import ShoppinglistEdit from "./ShoppinglistEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shoppinglist_add" element={<ShoppinglistAdd />} />
        <Route path="/shoppinglist_edit/:id" element={<ShoppinglistEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
