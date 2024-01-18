import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
        <ToastContainer />
        <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
