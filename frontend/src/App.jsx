import { RouterProvider } from "react-router";
import router from "./routes/router";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster position="top-right" offset={{ top: 70 }}/>;
    </>
  );
};

export default App;
