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
import PlayerStats from './PlayerStats'
import { ChakraProvider } from '@chakra-ui/react'
import myTheme from './theme'

const player1 = [
  {
    Player: 'Jayson Tatum',
    Team: 'Boston Celtics',
    Seasons: [{
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
    {
      Season: 'xxxx-xxxx',
      PTS: 25,
      AST: 3,
      REB: 8,
      TOV: 2.3,
      FGPercentage: 53,
      TwoPPercentage: 61,
      ThreePPercentage: 38,
      FTPercentage: 83,
      eFGPercentage: 52,
      ShooterGrade: 'C+',
    }]
  },
  // Add more data objects as needed
];

const player2 = [
  {
    Player: 'Jaylen Brown',
    Team: 'Boston Celtics',
    Seasons: [{
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
    {
      Season: 'xxxx-xxxx',
      PTS: 25,
      AST: 3,
      REB: 8,
      TOV: 2.3,
      FGPercentage: 53,
      TwoPPercentage: 61,
      ThreePPercentage: 38,
      FTPercentage: 83,
      eFGPercentage: 52,
      ShooterGrade: 'C+',
    }]
  },
  // Add more data objects as needed
];

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Homepage />} />
      <Route path="stats" element={<PlayerStats data={player1}/>} />
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