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
import Homepage from './pages/Homepage'
import PlayerStats from './pages/PlayerStats'
import { ChakraProvider } from '@chakra-ui/react'

const test = [
  {
    Player: 'Sample Player',
    Season: 'xxxx-xxxx',
    PTS: 20,
    AST: 5,
    REB: 10,
    TOV: 2,
    FGPercentage: 50,
    TwoPPercentage: 60,
    ThreePPercentage: 40,
    FTPercentage: 85,
    eFGPercentage: 55,
    ShooterGrade: 'A',
  },
  // Add more data objects as needed
];

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Homepage />} />
      <Route path="stats" element={<PlayerStats data={test}/>} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
