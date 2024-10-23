
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Join from './component/Join/Join';
import Chat from './component/chat/Chat';
const ENDPOINT = 'http://localhost:4500/';
// const socket = socketIO(ENDPOINT, {transports: ['websocket']});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

