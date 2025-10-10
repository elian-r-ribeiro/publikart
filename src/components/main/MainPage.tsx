'use client'

import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

export default function MainPage({children}: {children: React.ReactNode}) {

    return (
        <div className="h-screen flex flex-col justify-between">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <div className="backdrop-blur border-r border-zinc-700">
                    <SideBar isSupposedToBeHiddenOnSmallerScreens={true} areItemsSupposedToBeCentered={false} />
                </div>
                <div className="flex-1 backdrop-blur overflow-auto p-5">
                    <main className="h-full">{children}</main>
                </div>
            </div>
            <Footer />
        </div>
    );
}