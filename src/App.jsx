import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import PlayerStats from './components/PlayerStats'

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
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="stats" element={<PlayerStats data={test}/>} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
