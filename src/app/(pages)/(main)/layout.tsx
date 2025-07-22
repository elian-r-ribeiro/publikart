import MainPage from "@/components/others/MainPage";

export default function Layout(props: any) {
    return (
        <MainPage>
            {props.children}
        </MainPage>
    );
}