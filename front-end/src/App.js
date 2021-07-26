import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Assigned from "./components/Assigned/Assigned";
import Unassigned from "./components/Unassigned/Unassigned";
import Assign_book from "./components/Assign_book/Assign_book";
import History_Page from "./components/History_Page/Hstory_Page";
import Take_back from "./components/Take_back/Take_back";
import NavbarCompo from "./components/Navbar_Compo/Navbar_Compo";
import FooterCompo from "./components/Footer_Compo/Footer_Compo";
import AddBook from './components/AddBook/AddBook';
import UpdateInfo from './components/UpdateInfo/UpdateInfo';
import UpdateDeletePage from './components/UpdateDeletePage/UpdateDeletePage';


function App() {
  return (
      <div className="App page-container">
        <div className="content-wrap">
          <Router>
            <NavbarCompo />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/assigned" exact component={Assigned} />
              <Route path="/unassigned" exact component={Unassigned} />
              <Route path="/assign_user/:id" exact component={Assign_book} />
              <Route path="/history" exact component={History_Page} />
              <Route path="/addBook" exact component={AddBook} />
              <Route path="/updateInfo" exact component={UpdateInfo} />
              <Route path="/updateInfo/:id" exact component={UpdateDeletePage} />
              <Route path="/take_back" exact component={Take_back} />
            </Switch>
          </Router>
        </div>
        <FooterCompo />
      </div>
  );
}

export default App;
