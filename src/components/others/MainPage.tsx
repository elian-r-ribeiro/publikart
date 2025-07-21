import Footer from "./Footer";
import Middle from "./Middle";
import SideBar from "./SideBar";

export default function MainPage() {
    return (
        <div className="h-screen flex flex-col justify-between">
            <div className="flex h-screen">
                <div className="backdrop-blur border-r border-zinc-700">
                    <SideBar />
                </div>
                <div className="flex-1 bg-amber-300">
                    <Middle />
                </div>
            </div>
            <Footer />
        </div>
    );
}