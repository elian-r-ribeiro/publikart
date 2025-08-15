import MainPage from "@/components/main/MainPage";

export default function Layout(props: any) {
    return (
        <MainPage>
            {props.children}
        </MainPage>
    );
}