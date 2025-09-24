import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Problem1 from './pages/problems/Problem1';
import Problem2 from './pages/problems/Problem2';
import Problem3 from './pages/problems/Problem3';
import Problem4 from './pages/problems/Problem4';
import Problem5 from './pages/problems/Problem5';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard routes with layout */}
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/problema-1" element={
          <Layout>
            <Problem1 />
          </Layout>
        } />
        <Route path="/problema-2" element={
          <Layout>
            <Problem2 />
          </Layout>
        } />
        <Route path="/problema-3" element={
          <Layout>
            <Problem3 />
          </Layout>
        } />
        <Route path="/problema-4" element={
          <Layout>
            <Problem4 />
          </Layout>
        } />
        <Route path="/problema-5" element={
          <Layout>
            <Problem5 />
          </Layout>
        } />
        
        {/* 404 route without layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
