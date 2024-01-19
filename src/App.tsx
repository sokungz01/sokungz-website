import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ClassSchedulePage, NotFoundPage } from "./pages";
function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/class-schedule' element={<ClassSchedulePage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
