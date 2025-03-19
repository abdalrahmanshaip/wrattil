import { HomePage, TajweedPage } from "@/Pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/tajweed" element={<TajweedPage />} />
    </>
  )
)

export default router

