import { AllDetails } from "./Components/AllDetails.jsx";
import IncidentForm from "./Components/Incident.jsx"
import { Update } from "./Components/Update.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <>
<Router>
  <Routes>
 
    <Route path="/register" element={<IncidentForm />} />
    <Route path="/update/:id" element={<Update />} />
    <Route path="/" element={<AllDetails />} />

  </Routes>
</Router>
    
    
    </>
  )
}

export default App
