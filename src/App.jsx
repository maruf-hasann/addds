import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

function App() {
  return (
    <div className=" bg-[#F2F5F9]">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
