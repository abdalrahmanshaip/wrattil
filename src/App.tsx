import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage, TajweedPage } from "./Pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/TajweedPage" element={<TajweedPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
