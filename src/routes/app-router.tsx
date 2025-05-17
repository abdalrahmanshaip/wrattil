import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import {
  HomePage,
  QuranPage,
  TajweedPage,
  BatchDetails,
  GroupDetails,
  QuranQuestionBank,
  AdminsPage,
  StudentsPage,
  LoginPage,
  RegisterPage,
} from '@/Pages'

import ProtectedRoute from '@/components/ProtectedRoute'

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
        path="/students"
        element={
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quran/batch/:id"
        element={
          <ProtectedRoute>
            <BatchDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quran/group/:id"
        element={
          <ProtectedRoute>
            <GroupDetails />
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
