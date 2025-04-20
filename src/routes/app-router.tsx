import { HomePage, QuranPage, TajweedPage , BatchDetails, GroupDetails, QuranQuestionBank, AdminsPage, StudentsPage, LoginPage, RegisterPage } from "@/Pages";
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
      <Route path="/admins" element={<AdminsPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/quran/batch/:id" element={<BatchDetails />} />
      <Route path="/quran/group/:id" element={<GroupDetails />} />
      <Route path="/quran-questions" element={<QuranQuestionBank />} />
    </>
  )
)

export default router

