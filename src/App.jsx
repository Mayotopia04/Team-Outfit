import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Home = lazy(() => import('pages/Home'));

const App = () => {
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      try {
        // Simulate fetch delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsFetched(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout isFetched={isFetched} />}>
        {isFetched ? null : <Navigate to="/home" replace />}
      </Route>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

const MainLayout = ({ isFetched }) => {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        {isFetched ? (
          <div>
            {/* Main layout content when data is fetched */}
            <h1>Main Layout</h1>
            <p>Main content goes here.</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Suspense>
    </>
  );
};

export default App;
