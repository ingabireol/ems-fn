import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Portal from './components/Portal';
import Dashboard from './Dashboard';
import DepartmentCreate from './features/depatments/DepartmentCreate';
import DepartmentEdit from './features/depatments/DepartmentEdit';
import DepartmentList from './features/depatments/DepartmentList';
import DepartmentView from './features/depatments/DepartmentView';
import EmployeeCreate from './features/employees/EmployeeCreate';
import EmployeeEdit from './features/employees/EmployeeEdit';
import EmployeeList from './features/employees/EmployeeList';
import EmployeeView from './features/employees/EmployeeView';
import PositionCreate from './features/positions/PositionCreate';
import PositionEdit from './features/positions/PositionEdit';
import PositionList from './features/positions/PositionList';
import PositionView from './features/positions/PositionView';
import UserCreate from './features/users/UserCreate';
import UserEdit from './features/users/UserEdit';
import Userlist from './features/users/Userlist';
import UserView from './features/users/UserView';
import Login from './Login';
import "./sb-admin-2.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Login />} />

        <Route path='/portal' element={<Portal />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user-list' element={<Userlist />} />
          <Route path='create-user' element={<UserCreate />} />
          <Route path='user-view/:id' element={<UserView />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          {/* employee pages */}
          <Route path='employee-list' element={<EmployeeList />} />
          <Route path='create-employee' element={<EmployeeCreate />} />
          <Route path='employee-view/:id' element={<EmployeeView />} />
          <Route path='employee-edit/:id' element={<EmployeeEdit />} />
          {/* profile pages */}
          <Route path='profile-view/:id' element={<UserView />} />
          <Route path='profile-edit/:id' element={<UserEdit />} />
          {/* Notification pages */}
          <Route path='notification-list' element={<Userlist />} />
          <Route path='create-notificatification' element={<UserCreate />} />
          <Route path='notification-view/:id' element={<UserView />} />
          <Route path='notification-edit/:id' element={<UserEdit />} />
          {/* department pages */}
          <Route path='department-list' element={<DepartmentList />} />
          <Route path='create-department' element={<DepartmentCreate />} />
          <Route path='department-view/:id' element={<DepartmentView />} />
          <Route path='department-edit/:id' element={<DepartmentEdit />} />
          {/* Postion Pages */}
          <Route path='position-list' element={<PositionList />} />
          <Route path='position-create' element={<PositionCreate />} />
          <Route path='position-view/:id' element={<PositionView />} />
          <Route path='position-edit/:id' element={<PositionEdit />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
