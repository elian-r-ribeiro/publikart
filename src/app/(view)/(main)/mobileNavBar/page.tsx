import SideBar from "@/components/main/SideBar";

export default function MobileNavBar() {
    return (
        <div className="centerItems">
            <SideBar isSupposedToBeHiddenOnSmallerScreens={false} areItemsSupposedToBeCentered={true} ></SideBar>
        </div>

    );
}