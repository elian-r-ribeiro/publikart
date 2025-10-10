import SideBar from "@/components/main/SideBar";

export default function MobileSideBar() {
    return (
        <div className="centerItems">
            <SideBar isSupposedToBeHiddenOnSmallerScreens={false} areItemsSupposedToBeCentered={true} ></SideBar>
        </div>

    );
}