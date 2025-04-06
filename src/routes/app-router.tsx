import { HomePage, QuranPage, TajweedPage , GroupDetails} from "@/Pages";
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
      <Route path="/quran" element={<QuranPage />} />
      <Route path="/quran/batch/:id" element={<GroupDetails />} />
    </>
  )
)

export default router

