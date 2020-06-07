import React from 'react';
import RouterConfig from "./router/router-config"
import "./static/common.scss"
import RouterView from "./router/routerView"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./store/index"
function App() {
  return (
     <Provider store={store}>
          <BrowserRouter>
               <div className="App">
                   <RouterView routes={RouterConfig}></RouterView>
               </div>
          </BrowserRouter>
     </Provider>
  );
}

export default App;
