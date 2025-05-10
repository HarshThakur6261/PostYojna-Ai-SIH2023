import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Signup from "../components/Signup";
import AddScheme from "../components/AddScheme";
import Addlocation from "../components/Addlocation";
<<<<<<< HEAD
import Accounts from "../components/Accounts";
=======
import OpenAccount from "../components/OpenAccount";
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/AddScheme",
        element: <AddScheme></AddScheme>,
<<<<<<< HEAD

      },
      {
        path: "/AddLocation",
        element: <Addlocation></Addlocation>,

      },
      {
        path: "/AccountData",
        element: <Accounts></Accounts>,

      },
    ]
  }]
=======
      
  },
  {
    path: "/AddLocation",
    element: <Addlocation></Addlocation>,
  
},
{
  path: "/OpenAccount",
  element: <OpenAccount></OpenAccount>

},


]
}]
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
);

export default router;
