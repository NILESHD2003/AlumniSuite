
import Features from "../components/layout/Features"
import { RetroGridDemo } from "../components/layout/HeroBackgound"
import NavBar from "../components/layout/NavBar"

const LandingPage = () => {
    return (
        <div>
            <NavBar />
            <RetroGridDemo className="">
                <img src="" alt="" />
            </RetroGridDemo>
            <Features />

        </div>
    )
}

export default LandingPage
