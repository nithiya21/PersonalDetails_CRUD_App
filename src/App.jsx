
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PersonalDetails from './component/mainpage'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PersonalDetails />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
