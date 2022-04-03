import React, {Fragment, useState, useContext, useEffect} from 'react'
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import MobileNavigation from './components/mobileNavigation/MobileNavigation';
import Auth from './components/auth/Auth'
import HomePage from './components/home/HomePage';
import AddOffer from './components/home/AddOffer';
import OfferById from './components/OfferPage/OfferById';
import EditOffer from './components/EditOffer/EditOffer';
import DealsPage from './components/Deals/DealsPage';
import DealsList from './components/Deals/DealsList';
import DealById from './components/Deals/DealById';
import AddDeal from './components/Deals/AddDeal';
import EditDeal from './components/Deals/EditDeal';
import CallsPage from './components/Calls/CallsPage';
import CallsList from './components/Calls/CallsList';
import AddCall from './components/Calls/AddCall';

const userContext = React.createContext(null)

function App() {
    const context = useContext(userContext)

    const [user, setUser] = useState(context)
    const [offers,setOffers] = useState({offers: [], error: null, update: false})
    const [deals, setDeals] = useState({deals: [], error: null, update: false})
    const [calls, setCalls] = useState({calls: [], error: null, update: false})

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
          setOffers({...offers, offers: json, error: null})
        } catch(e) {
          console.log(e)
          setOffers({...offers, error: true})
        }
       }
       FetchOffers()
    }, [offers.update])

    useEffect(() => {
        async function Fetch() {
            try{
                let response = await fetch('https://dsdrealestate.herokuapp.com/deals', {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch deals!')
                }
                let json = await response.json()
                setDeals({...deals, deals: json, error: null})
                console.log(json)
            }catch(err) {
                setDeals({...deals, error: err.message})
            }
        }
        Fetch()
    }, [deals.update])

     useEffect(() => {
       async function FetchCalls() {
        try {
          const response = await fetch('https://dsdrealestate.herokuapp.com/calls', {
            headers: {
              'Content-type': 'application/json'
            }
          })
          const json = await response.json()

          setCalls({...calls, calls: json, error: null})
        } catch(e) {
          console.log(e)
          setCalls({...calls, error: true})
        }
       }
       FetchCalls()
    }, [calls.update])
    
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
              <Route path={'/offers/:id/edit'} element={<EditOffer setOffers={setOffers} offers={offers}/>}/>
              <Route path={'/offers/:id/customer'} element={<p>Add customer offer</p>}/>
              <Route path={'/deals/*'} element={<DealsPage/>}>
                <Route path={'add'} element={<AddDeal deals={deals} setDeals={setDeals}/>}/>
                <Route path={':id'} element={<DealById deals={deals} setDeals={setDeals}/>}/>
                <Route path={':id/edit'} element={<EditDeal deals={deals} setDeals={setDeals}/>}/>
                <Route index element={<DealsList deals={deals} />}/>
              </Route>
              <Route path={'/calls/*'} element={<CallsPage/>}>
                <Route path={'add'} element={<AddCall calls={calls} setCalls={setCalls}/>}/>
                 <Route path={'stats'} element={<p>Call Stats</p>}/>
                <Route index element={<CallsList calls={calls}/>}/>
              </Route>
            </Fragment>
          }
        </Routes>
      </main>
    </HashRouter>
   
  );
}

export default App;
