import {Routes,Route} from 'react-router-dom'
import Addmaintask from './components/Addtask/Addmaintask'
import Showtasks from './components/Showtasks/Showtasks';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/addmaintask" element ={<Addmaintask/>}/>
      <Route path="/addchildtask" element ={<Addmaintask/>}/>
      <Route path="/" element ={<Showtasks/>}/>
     </Routes>
    </div>
  );
}

export default App;
