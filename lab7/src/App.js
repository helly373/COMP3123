import logo from './logo.svg';
import './App.css';
import {Welcome, React} from './Welcome';
// import { studentID, studentName } from './Studentinfo';
import Studentinfo from './Studentinfo';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome/>
        <React/>
       <Studentinfo studentId = "101414910" name="Helly Chauhan" college="George Brown College, Toronto"></Studentinfo>
      </header>
    </div>
  );
}

export default App;
