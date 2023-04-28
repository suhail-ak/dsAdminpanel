import Home from "./pages/home/Home";
// import NewAdmin from "./pages/admin/NewAdmin";
// import AdminList from "./pages/admin/list/AdminList";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewQuiz from "./pages/quiz/NewQuiz";
import QuizList from "./pages/quiz/list/QuizList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import MyTests from "./pages/quiz/list";

// import NewAdminModal from "./pages/admin/modal/NewAdminModal";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            {/* <Route path="q" element={<MyTests />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="quiz">
              <Route index element={<NewQuiz />} />

              <Route path="list" element={<QuizList />} />
            </Route>

            <Route path="users">
              <Route index element={<List />} />

              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={
                  <New inputs={userInputs} title="User Registration Form" />
                }
              />
            </Route>
            {/* <Route path="admin">
              <Route index element={<AdminList />} />

              <Route path=":userId" element={<NewAdmin />} />
              <Route
                path="new"
                element={
                  <NewAdmin
                    inputs={userInputs}
                    title="Admin Registration Form"
                  />
                }
              />
            </Route> */}

            {/* <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
