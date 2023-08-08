import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider,
  Outlet
} from 'react-router-dom'

// layouts and pages
import Homepage from './Homepage'
import PlayerPage from './PlayerPage'
import { ChakraProvider } from '@chakra-ui/react'
import myTheme from './theme'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Homepage />} />
      <Route path="/players/:playerId" element={<PlayerPage />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

// 3. Pass the new theme to `ChakraProvider`
<ChakraProvider theme={myTheme} cssVarsRoot="body" >
  <App />
</ChakraProvider>

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)