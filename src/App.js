import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import appRoutes from "./app/appRoutes";

import { RouterOutlet } from "./app/core/modules/custom-router-dom";

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterOutlet routes={appRoutes} />
      </Suspense>
    </Router>
  );
}

export default App;
