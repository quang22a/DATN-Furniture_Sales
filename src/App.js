import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import appRoutes from "./app/appRoutes";

import { Header } from "./app/shared/components/layout/Header";
import { Footer } from "./app/shared/components/layout/Footer";
import { RouterOutlet } from "./app/core/modules/custom-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <RouterOutlet routes={appRoutes} />
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
