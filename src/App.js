import React, {Fragment, useState, useContext, useEffect} from 'react'
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import MobileNavigation from './components/mobileNavigation/MobileNavigation';
import Auth from './components/auth/Auth'
import HomePage from './components/home/HomePage';
import AddOffer from './components/home/AddOffer';
import OfferById from './components/OfferPage/OfferById';

const userContext = React.createContext(null)

function App() {
    const context = useContext(userContext)
    const [user, setUser] = useState(context)
    const [offers,setOffers] = useState({offers: [], error: null, update: false})

    useEffect(() => {
       async function FetchOffers() {
        try {
          const response = await fetch('https://dsdrealestate.herokuapp.com/offers', {
            headers: {
              'Content-type': 'application/json'
            }
          })
          const json = await response.json()
          console.log(json)
          setOffers({...offers, offers: json.reverse(), error: null})
        } catch(e) {
          console.log(e)
          setOffers({...offers, error: true})
        }
       }
       FetchOffers()
    }, [offers.update])
    
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
              <Route path={'/'} element={<HomePage offers={offers}/>}/>
              <Route path={'/offers/add'} element={<AddOffer setOffers={setOffers} offers={offers}/>}/>
              <Route path={'/offers/:id'} element={<OfferById setOffers={setOffers} offers={offers}/>}/>
              <Route path={'/offers/:id/edit'} element={<p>Edit offer</p>}/>
              <Route path={'/offers/:id/customer'} element={<p>Add customer offer</p>}/>
              <Route path={'/deals'} element={<p>Deals page</p>}/>
              <Route path={'/calls'} element={<p>Calls page</p>}/>
            </Fragment>
          }
        </Routes>
      </main>
    </HashRouter>
   
  );
}

export default App;
