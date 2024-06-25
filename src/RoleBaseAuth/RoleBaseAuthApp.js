import Register from './Register';
import Login from './Login';
import Home from './Home';
import Layout from './Layout';
import Editor from './Editor';
import Admin from './Admin';
import Missing from './Missing';

import Lounge from './Lounge';
import LinkPage from './LinkPage';
import RequireAuth from './RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Unauthorized from './Unauthorized';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function RoleBaseApp() {

  return (
    
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default RoleBaseApp;