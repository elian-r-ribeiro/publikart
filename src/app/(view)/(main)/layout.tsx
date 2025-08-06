import MainPage from "@/components/others/main/MainPage";

export default function Layout(props: any) {
    return (
        <MainPage>
            {props.children}
        </MainPage>
    );
}