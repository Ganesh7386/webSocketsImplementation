import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home/index'
import {SocketProvider} from './components/socketContext/socketContext'

import './App.css'

const App = () => (
  <div>
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  </div>
)

export default App
