import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import AddData from "./components/AddData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/add' element={<AddData />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
