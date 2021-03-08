import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewDevice from './pages/NewDevice';

const routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/newdevice" component={NewDevice} />
    </Switch>
)

export default routes;