import { BrowserRouter, Route } from "react-router-dom";
import Drag from "./Components/Drag";
import ListOfFiles from "./Components/ListofFiles";
const App = ()=>{
    return (
        <BrowserRouter>
            <div className="container">
                <Route path="/" exact ><Drag></Drag></Route>
                <Route path="/files" exact> <ListOfFiles/> </Route>
            </div>
        </BrowserRouter>
    )
}
export default App;