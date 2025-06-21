import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { DiagnosticPage } from './pages/DiagnosticPage/DiagnosticPage';
// Mock Pages --->
const InfoPage = () => <div>Info Page</div>;
const NotificationsPage = () => <div>Notifications Page</div>;
const ReportsPage = () => <div>Reports Page</div>;
const SettingsPage = () => <div>Settings Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='/diagnostic' replace />} />
          <Route path='/diagnostic' element={<DiagnosticPage />} />
          <Route path='/info' element={<InfoPage />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/reports' element={<ReportsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
