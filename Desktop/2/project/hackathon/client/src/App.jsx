import { useEffect, useState } from "react"
import Commonform from "./components/common/form";
import { testFormControls } from "./config/test";

const initialFormData = {
  fullName: "",
  email: "",
  role: "",
  startDate: "",
  description: ""
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  useEffect(()=>{
    console.log(formData.startDate);
    
  },[formData])
  return (
   <div>
    
   </div>
  )
}

export default App
