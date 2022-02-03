import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
}

function Router({}:IRouterProps) {
    return <BrowserRouter>
        <Routes>
            <Route path="/:coinId/*" element={<Coin />} />
            <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />}/>
        </Routes>
    </BrowserRouter>
}

export default Router;