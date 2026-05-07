import { Route, Routes } from "react-router-dom";
import FloatingShape from "./component/FloatingShape.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

//this <> </> is React Fragment. React ka simple rule: "Component sirf ek parent element return kar skta hai." ,but this ReactFragment: "extra div ke bina multiple elements return karne ka tareeka."
//Eg : 
// return (
//   <h1>Hello</h1>
//   <p>World</p>
// );                 this is not allowed , if we will put <> </> then it will be allowed.


//Ye function App() kya hai? -> Ye ek React Component hai . Component means ek function jo UI return karta hai. 
//So App = root component, poore frontend ka starting point.

//JSX kya hai? -> (JavaScript + HTML). rEACT internally isko JS m conver karta hai.

function App() {
  return (
    //br means bottom right.
    <div className='min-h-screen bg-gradient-to-br
     from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>

      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />  {/*large */}
      <FloatingShape color="bg-green-500" size="w-48 h-48" top="70%" left="80%" delay={5} />  {/*medium */}
      <FloatingShape color="bg-green-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />  {/*small */}

      <Routes>
        <Route path='/' element={"Home"} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App
