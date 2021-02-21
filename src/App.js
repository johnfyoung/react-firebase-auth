import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./UserProvider";
import Routes from "./Routes";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
