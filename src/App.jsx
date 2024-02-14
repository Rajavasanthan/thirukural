import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Chapters from "./Chapters";
import Units from "./Units";
import Poems from "./Poems";
import Poem from "./Poem";
import Create from "./Create";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Thirukural
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/chapters"} className="nav-link">
                    Chapters
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/search"} className="nav-link">
                    Search
                  </Link>
                </li>
              </ul>
              <span className="navbar-text">
                <Link to={"/create-kural"} className="nav-link">
                  Create
                </Link>
              </span>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-kural" element={<Create />}></Route>
          <Route path="/chapters" element={<Chapters />}></Route>
          <Route path="/chapter/:chapterId" element={<Units />}></Route>
          <Route
            path="/chapter/:chapterId/unit/:unitId"
            element={<Poems />}
          ></Route>
          <Route
            path="/chapter/:chapterId/unit/:unitId/poem/:poemId"
            element={<Poem />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
