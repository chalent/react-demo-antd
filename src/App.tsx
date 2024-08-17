
import './App.css';
import { BrowserRouter, Routes, Route, useParams, useSearchParams } from 'react-router-dom';

import Layout from "./views/layout/Layout";
import Page404 from "./views/404";
import Dashboard from './views/dashboard/Index';
import RouteDemo from "./views/routeDemo/Index";
import ReduxDemo from "./views/reduxDemo/Index";
import AircraftGameIndex from "./views/aircraftGame/Index"

function App() {

  function TestRp() {
    // 此路由页面测试打开地址：http://localhost:3000/testrp/123?name=admin&pwd=11235
    const pathParams = useParams();
    const [pathSearch, /* setpathSearch */] = useSearchParams();

    console.log("路由地址参数", pathSearch.get("name"));
    

    return (
      <div>
        <p>静态测试：{ pathParams.id }</p>
        <p>路由后面带参数：{ pathSearch.get("name") }</p>
      </div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 嵌套子路由 */}
            <Route path='/dashboard?' element={ <Dashboard /> }></Route>
            <Route path="/main/routeDemo" element={ <RouteDemo /> }></Route>
            <Route path='/main/reduxDemo' element={ <ReduxDemo /> }></Route>
            <Route path='/main/airGame' element={ <AircraftGameIndex /> } />
          </Route>
          <Route path="/testrp/:id" element={<TestRp />}></Route>
          <Route path="/404" element={<Page404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
