import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'
import { routes as MyRoutes } from './routes';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <MyRoutes/>
      </AuthProvider>
    </Router>
  )
}

