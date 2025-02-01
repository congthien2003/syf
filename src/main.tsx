import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "./components/ui/provider.tsx";
import { Provider as ProviRedux } from "react-redux";
import { store } from "./core/store/store.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<ProviRedux store={store}>
				<App />
			</ProviRedux>
		</Provider>
	</StrictMode>
);
