import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <h2>Hello world!!!</h2>
            <Outlet />
        </main>
    )
}

export default Layout