import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path='/' element={''}>
        <Route index element={''} />
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
