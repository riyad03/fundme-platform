import logo from './logo.svg';
import './App.css';
import Home from './pages/home/home' ;
import About from './pages/about/about';
import Launch from './pages/launch/launch';
import Contact from './pages/contactus/contact';
import Nav from './components/nav';
import Footer from './components/footer';
import AuthPage from './pages/signin/page'
import CreateProject from './pages/projectCreation/projectCreation';
import {HashRouter   as Router, Routes, Route} from 'react-router-dom';
import ProjectDetails from './pages/project/projectDetails';
import ProjectManagementTabs from './pages/projectEditing/ProjectManagementTabs';
function App() {
  return (
    <Router>
      
        <header>
          <Nav />
        </header>
        <main>
        <Routes>
          <Route path='/' element ={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/launch' element={<Launch />}/>
          <Route path='/contactus' element={<Contact />}/>
          <Route path='/projects/:projectid' element={<ProjectDetails/>}/>
          <Route path='/signup' element={<AuthPage/>}/>
          <Route path='/projectcreation' element={<CreateProject/>}/>
          <Route path='/projectediting' element={<ProjectManagementTabs/>}/>
        </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
      
    </Router>
   
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          L
        </a>
      </header>
    </div>*/
  );
}

export default App;
