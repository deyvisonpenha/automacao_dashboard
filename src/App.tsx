import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Link} from "react-router-dom";
import {IoHome} from 'react-icons/io5'
import { FaPlusCircle } from 'react-icons/fa'

import GlobalStyle from './styles/Global';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <header>
        <Link to="/" >
            <IoHome size={30}/>
        </Link>
        <Link to="/newdevice" >
          <FaPlusCircle size={30}/>
        </Link>
      </header>
      
      <Routes />
    </BrowserRouter>
  </>
  );

export default App;
