import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./Screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./Screens/MyNotes/MyNotes";
import LoginPage from "./Screens/Login/LoginPage";
import SignupPage from "./Screens/Signup/SignupPage";
import CreateNote from "./Screens/CreateNote/CreateNote";
import UpdateNote from "./Screens/UpdateNote/UpdateNote";
import { useState } from "react";
import Profile from "./Screens/Profile/Profile";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // console.log(searchQuery);
  return (
    <>
      <BrowserRouter>
        <Header setSearchQuery={setSearchQuery} />
        <div className="container bg-gray-100 w-full md:px-36 px-2 mx-auto py-5">
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/signup" exact>
            <SignupPage />
          </Route>
          <Route exact path="/mynotes">
            <MyNotes searchQuery={searchQuery} />
          </Route>

          <Route exact path="/createnote">
            <CreateNote />
          </Route>

          <Route exact path="/note/:id">
            <UpdateNote />
          </Route>

          <Route exact path="/profile">
            <Profile />
          </Route>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
