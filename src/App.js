import './index.css';
import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import {Route, Routes} from "react-router-dom"


// import context
import {DataProvider} from "./context/DataContext"

function App() {
 
  return (
    <DataProvider>
      <Routes>
      {/* LAYOUT, cast OUTLET - je spomenuta v layout.js ako outlet(), cize cast kodu, ktory je nested */}
      {/* prakticky som presunul nemeniace sa komponenty ako header, navbar a footer mimo a tu mam iba to jadro */}
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="post">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>  
      </Routes>
    </DataProvider>
    
  );
}

export default App;

// kod pre instalaciu dates: npm i date-fns -S
// nainstalujem axios: npm i axios
// spustim json server npx json-server -p 3500 -w data/db.json
// otvori sa na http://localhost:3500/posts