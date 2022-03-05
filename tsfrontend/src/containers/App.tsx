import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import NavbarView from './navbar/NavbarView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Registration from './navbar/Forms/RegistrarionForm';
import Enter from './navbar/Forms/EnterForm/Enter';
import { UserContext, anonymous } from './UserContext/UserContext';
import Exit from './navbar/Exit';
import ContentView from './content/mainpage/ContentView';
import Profile from './content/profilepage/Profile';

function App() {
  const [user, setUser] = React.useState(anonymous);
  useEffect(() => {
    fetch('/api/check_user').then((resp) => {
      if (resp.status === 200) {
        setUser({ isAuthorized: true });
      } else {
        console.log(resp.status);
      }
    });
  }, []);
  return (
    <Router>
      <UserContext.Provider
        value={{
          // @ts-ignore
          userContext: user,
          // @ts-ignore
          setUserContext: (newUser) => {
            setUser(newUser);
          },
        }}
      >
        <NavbarView />
        <Container>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/enter" element={<Enter />} />
            <Route path="/exit" element={<Exit />} />
            <Route path="/" element={<ContentView />} />
            <Route path={'/profile/:id'} element={<Profile />} />
          </Routes>
        </Container>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
