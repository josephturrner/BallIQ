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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

// function App() {
  // useEffect(() => {
  //   fetch('http://localhost:8081/players')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err));
  // }, [])
//   return (
//     <RouterProvider router={router} />
//   )
// }