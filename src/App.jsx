import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./components";
import { PageHome, PageNotFound, PageRichPeople, PageRichPerson, PageStore } from "./pages";
import { useGetRichHumansQuery } from './redux';

function App() {
  const { data: richHumans = [] } = useGetRichHumansQuery();
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageHome />} />
          
          <Route path="choose-a-person">
            <Route index element={<PageRichPeople items={richHumans} />} />
            <Route path=":personId" element={<PageRichPerson />} />
          </Route>

          <Route path="spend">
            <Route path=":personId" element={<Navigate to="1" replace />} />
            <Route path=":personId/:page" element={<PageStore />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;