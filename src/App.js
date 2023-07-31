import React from "react";
import Dashboard from "./pages/dashboard";

const App = () => {

  return (
    <React.Fragment>
    <header>
    <h1>Milestone Timer</h1>
    </header>
    <main>
    <div className="card">
    <section>
    <Dashboard/>
    </section>
    </div>
    </main>
    </React.Fragment>
  )
}

export default App;