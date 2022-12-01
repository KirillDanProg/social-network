import {App} from "./App";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
