import demoimg from "../assets/pizza.png"
import demoimg2 from "../assets/burger.png"
import demoimg3 from "../assets/fries.png"
import demoimg4 from "../assets/garlicbread.png"
import demoimg5 from "../assets/noodles.png"
import demoimg6 from "../assets/pasta.png"
import demoimg7 from "../assets/sandwiches.png"
function Card(){
    return (
        <>
        <div className="card">
            <img src={demoimg} className="rounded-4xl mt-4 h-100 w-80  transition-all hover:scale-105"></img>
            <p className="text-center text-2xl mt-2">Pizza</p>
        </div>
        <div className="card">
            <img src={demoimg2} className="rounded-4xl mt-4 h-100 w-100 transition-all hover:scale-105"></img>
            <p className="text-center text-2xl mt-2">Burger</p>
        </div>
        <div className="card">
            <img src={demoimg3} className="rounded-4xl mt-4 h-100 w-80 transition-all hover:scale-105"></img>
            <p className="text-center text-2xl mt-2">Fries</p>
        </div>
        <div className="card">
            <img src={demoimg4} className="rounded-4xl mt-4 h-100 w-90 transition-all hover:scale-105"></img>
            <p className="text-center text-2xl mt-2">Garlic Bread</p>
        </div>
        <div className="card">
            <img src={demoimg5} className="rounded-4xl mt-4 h-100 w-80 transition-all hover:scale-105"></img>
            <p className="text-center text-2xl mt-2">Noodles</p>
        </div>
        <div className="card">
            <img src={demoimg6} className="rounded-4xl mt-4 h-100 w-80 transition-all hover:scale-105"></img>
            <p className="text-center text-2xl mt-2">Pasta</p>
        </div>
        <div className="card">
            <img src={demoimg7} className="rounded-4xl mt-4 h-100 w-80 transition-all hover:scale-105"></img>
            <p className="text-center text-2xl mt-2">Sandwich</p>
        </div>
        </>
    )
}
export default Card;