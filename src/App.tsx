import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { Button } from './components/ui/button'

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
      <div>
        <Button className='bg-our-brown-200'>Test</Button>
      </div>
    </>
  )
}

export default App
