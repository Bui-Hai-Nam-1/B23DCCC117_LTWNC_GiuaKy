import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from "./pages/Home";

const Stats = lazy(() => import("./pages/Stats"));

function App() {
  return (
    <BrowserRouter>
      <header className="app-navigation">
        <NavLink to="/" end>
          Thư viện
        </NavLink>

        <NavLink to="/stats">
          Thống kê
        </NavLink>
      </header>

      <Suspense fallback={<p>Đang tải trang...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;