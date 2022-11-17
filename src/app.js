import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RoutesApp from './routesApp'



function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <RoutesApp />
    </>
  )
}

export default App
