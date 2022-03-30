import React, {Fragment, useState, useContext} from 'react'
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import MobileNavigation from './components/mobileNavigation/MobileNavigation';
import Auth from './components/auth/Auth'

const userContext = React.createContext(null)

function App() {
    const context = useContext(userContext)
    const [user, setUser] = useState(context)
    console.log(user)

    
  return (
    <HashRouter>
      { window.innerWidth < 850 ? 
        <userContext.Provider value={user || ''}>
          <MobileNavigation userContext={userContext}/>
        </userContext.Provider>
       : 
        <userContext.Provider value={user || ''}>
          <Navigation userContext={userContext}/>
        </userContext.Provider>
       }
      <main className="App">
        <Routes>
            {!user ? 
            <Route path={'/'} element={
              <userContext.Provider value={user}>
                <Auth setUser={setUser}/>
              </userContext.Provider>}
            />
            : 
            <Fragment>
              <Route path={'/'} element={<p>Home</p>}/>
            </Fragment>
          }
        </Routes>
      </main>
    </HashRouter>
   
  );
}

export default App;
