import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PhysicalActivity from './pages/physicalActivities/physicalActivity'
import PhysicalActivities from './pages/physicalActivities'



export default function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<PhysicalActivities />}/>
            <Route  path="/physicalActivities" element={<PhysicalActivities />}/>
            <Route  path="physicalActivity/:id" element={<PhysicalActivity />}/>
        </Routes>
        </BrowserRouter>
    )
}