import { IconBook, IconBrush, IconMusic, IconUser } from "@tabler/icons-react";
import PreferenceOption from "../others/PreferenceOption";

export default function SelectPreferencesForm() {
    return (
        <div className="h-screen gap-10 centerItems">
            <h1 className="text-4xl font-black">O que é você?</h1>
            <div className="centerItemsRow gap-3">
                <PreferenceOption text="Compositor" iconName={IconMusic}></PreferenceOption>
                <PreferenceOption text="Escritor" iconName={IconBook} isDisabled></PreferenceOption>
                <PreferenceOption text="Artista" iconName={IconBrush} isDisabled></PreferenceOption>
                <PreferenceOption text="Apreciador" iconName={IconUser}></PreferenceOption>
            </div>
        </div>
    );
}