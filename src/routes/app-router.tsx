import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
 
import {
  HomePage,
  QuranPage,
  TajweedPage,
  TajweedDetailsPage,
  GroupDetailsPage,
  QuranQuestionBank,
  AdminsPage,
  StudentsPage,
  LoginPage,
  RegisterPage,
  ExamPage,
  ExamGradesPage
} from '@/Pages'

import ProtectedRoute from '@/components/ProtectedRoute'
import AcademicYearsPage from '@/Pages/AcademicYearsPage'
import GroupsPage from '@/Pages/GroupsPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tajweed"
        element={
          <ProtectedRoute>
            <TajweedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tajweed/:tajweedId"
        element={
          <ProtectedRoute>
            <TajweedDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quran"
        element={
          <ProtectedRoute>
            <QuranPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admins"
        element={
          <ProtectedRoute>
            <AdminsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exams"
        element={
          <ProtectedRoute>
            <ExamPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exams/:examId/grades"
        element={
          <ProtectedRoute>
            <ExamGradesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quran/:trackId/academic-years"
        element={
          <ProtectedRoute>
            <AcademicYearsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/academic-years/:academicYearId"
        element={
          <ProtectedRoute>
            <GroupsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/:groupId"
        element={
          <ProtectedRoute>
            <GroupDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quran-questions"
        element={
          <ProtectedRoute>
            <QuranQuestionBank />
          </ProtectedRoute>
        }
      />
    </>
  )
)

export default router
