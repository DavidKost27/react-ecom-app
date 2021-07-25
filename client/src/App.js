import "./App.css";
import Button from "./components/Button/index";
import Layout from "./components/Layout/Layout.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout></Layout>
        <p>OMG</p>
        <Button />
      </header>
    </div>
  );
}

export default App;
