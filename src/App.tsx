import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { HomePage } from './Pages'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/' element={<HomePage />}>
        <Route index element={<HomePage />} />
      </Route>
    ])
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
