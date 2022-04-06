import './index.css'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Admin from './admin/Admin';

ReactDOM.render(<Router>
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/admin' element={<Admin />} />
    </Routes>
</Router>, document.getElementById('root'))
