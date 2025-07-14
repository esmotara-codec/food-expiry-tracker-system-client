import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './component/routes/router.jsx'
import AuthProvider from './component/context/AuthProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router= {router}/>
      </AuthProvider>
  </StrictMode>,
)
