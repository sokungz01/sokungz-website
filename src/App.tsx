import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ClassSchedulePage, NotFoundPage, AddClassSchedulePage } from "./pages";
function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/class-schedule' element={<ClassSchedulePage/>}/>
        <Route path='/class-schedule/add-schedule' element={<AddClassSchedulePage/>}></Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
