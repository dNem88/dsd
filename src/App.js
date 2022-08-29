import React, {Fragment, useState, useContext, useEffect} from 'react'
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom'

import Navigation from './components/navigation/Navigation'
import MobileNavigation from './components/mobileNavigation/MobileNavigation';
import Footer from './components/footer/Footer'

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

import CustomersPage from './components/Customers/CustomersPage';
import CustomersList from './components/Customers/CustomersList'
import AddCustomer from './components/Customers/AddCustomer';
import CustomerById from './components/Customers/CustomerById';
import EditCustomer from './components/Customers/EditCustomer';

import ArchivePage from './components/Archive/ArchivePage';
import ArchiveById from './components/Archive/ArchiveById';

import StatsPage from './components/StatsPage/StatsPage';
import Tasks from './components/TasksPage/Tasks'
import TaskList from './components/TasksPage/TaskList';
import TaskById from './components/TasksPage/TaskById';
import EditTask from './components/TasksPage/EditTask';
import AddTask from './components/TasksPage/AddTask';

const userContext = React.createContext(null)

function App() {
    const context = useContext(userContext)

    const [user, setUser] = useState(context)
    const [offers,setOffers] = useState({offers: [], error: null, update: false})
    const [tasks,setTasks] = useState({tasks: [], error: null, update: false})
    const [deals, setDeals] = useState({deals: [], error: null, update: false})
    const [calls, setCalls] = useState({calls: [], error: null, update: false})
    const [customers, setCustomers] = useState({customers: [], error: null, update: false})

    useEffect(() => {
       async function FetchOffers() {
        try {
          const response = await fetch('https://dsdrealestate.herokuapp.com/offers', {
            headers: {
              'Content-type': 'application/json',
              'Authorization' : user ? user.user.authToken : 'Unauthorized'
            }
          })
          const json = await response.json()
          setOffers({...offers, offers: json, error: null})
        } catch(e) {
          setOffers({...offers, error: true})
        }
       }
       if (user ) {
         FetchOffers()

       }
    }, [offers.update, user])

    useEffect(() => {
        async function Fetch() {
            try{
                let response = await fetch('https://dsdrealestate.herokuapp.com/deals', {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': user ? user.user.authToken : 'Unauthorized'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch deals!')
                }
                let json = await response.json()
                setDeals({...deals, deals: json, error: null})
                
            }catch(err) {
                setDeals({...deals, error: err.message})
            }
        }
        if (user) {

          Fetch()
        }
    }, [deals.update, user])

     useEffect(() => {
       async function FetchCalls() {
        try {
          const response = await fetch('https://dsdrealestate.herokuapp.com/calls', {
            headers: {
              'Content-type': 'application/json',
              'Authorization': user ? user.user.authToken : 'Unauthorized'
            }
          })
          const json = await response.json()

          setCalls({...calls, calls: json, error: null})
        } catch(e) {
          console.log(e)
          setCalls({...calls, error: true})
        }
       }
       if (user) {
         FetchCalls()

       }
    }, [calls.update, user])

    useEffect(() => {
       async function FetchCustomers() {
        try {
          const response = await fetch('https://dsdrealestate.herokuapp.com/customers', {
            headers: {
              'Content-type': 'application/json',
              'Authorization': user ? user.user.authToken : 'Unauthorized'
            }
          })
          const json = await response.json()
         
          setCustomers({...customers, customers: json, error: null})
        } catch(e) {
          
          setCustomers({...customers, error: true})
        }
       }
       if (user) {
         FetchCustomers()
       }
    }, [customers.update, user])
    
    useEffect(() => {
      //  'https://easy-rose-coral-veil.cyclic.app/tasks'
       async function FetchTasks() {
        try {
          const response = await fetch('https://easy-rose-coral-veil.cyclic.app/tasks', {
            headers: {
              'Content-type': 'application/json',
              'Authorization' : user ? user.user.authToken : 'Unauthorized'
            }
          })
          const json = await response.json()
          setTasks({...tasks, tasks: json, error: null})
        } catch(e) {
          setTasks({...tasks, error: true})
        }
       }
       if (user ) {
         FetchTasks()

       }
    }, [tasks.update, user])
   
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
              <Route path={'/offers/archive'} element={<ArchivePage/>}/>
              <Route path={'/archive/:id'} element={<ArchiveById  setOffers={setOffers} offers={offers}/>}/>
              <Route path={'/deals/*'} element={<DealsPage/>}>
                <Route path={'add'} element={<AddDeal deals={deals} setDeals={setDeals}/>}/>
                <Route path={':id'} element={<DealById deals={deals} setDeals={setDeals}/>}/>
                <Route path={':id/edit'} element={<EditDeal deals={deals} setDeals={setDeals}/>}/>
                <Route index element={<DealsList deals={deals} />}/>
              </Route>
              <Route path={'/calls/*'} element={<CallsPage/>}>
                <Route path={'add'} element={<AddCall calls={calls} setCalls={setCalls}/>}/>
                <Route index element={<CallsList calls={calls}/>}/>
              </Route>
              <Route path={'/customers/*'} element={<CustomersPage/>}>
                <Route path={':id/add'} element={<AddCustomer customers={customers} setCustomers={setCustomers}/>}/>
                <Route path={':id/edit'} element={<EditCustomer setCustomers={setCustomers} customers={customers}/>}/>
                <Route path={':id'} element={<CustomerById customers={customers} setCustomers={setCustomers}/>}/>
                <Route index element={<CustomersList customers={customers}/>}/>
              </Route>
              <Route path={'/tasks/*'} element={<Tasks/>}>
                <Route path={'add'} element={<AddTask tasks={tasks} setTasks={setTasks}/>}/>
                <Route path={':id/edit'} element={<EditTask setTasks={setTasks} tasks={tasks}/>}/>
                <Route path={':id'} element={<TaskById tasks={tasks} setTasks={setTasks}/>}/>
                <Route index element={<TaskList tasks={tasks}/>}/>
              </Route>
              <Route path={'/stats'} element={<StatsPage/>}/>
            </Fragment>
          }
        </Routes>
      </main>
      {user && <Footer/>}
    </HashRouter>
   
  );
}

export default App;
