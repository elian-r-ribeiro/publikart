import MainPage from "@/components/main/MainPage";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MainPage>
            {children}
        </MainPage>
    );
}