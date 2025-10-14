import { LoginFormValues, LoginOrRegisterResult } from "@/model/Types";
import { logoutFromFirebase, tryLogin } from "@/services/AuthService";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RefObject, SetStateAction } from "react";

interface UIStateChangers {
    setIsPlaying: React.Dispatch<SetStateAction<boolean>>,
    setMessage: React.Dispatch<SetStateAction<string>>,
    setIsShow: React.Dispatch<SetStateAction<boolean>>,
    setLoadingMessage: React.Dispatch<SetStateAction<string>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

export const loginFormOnSubmit = async (
    data: LoginFormValues,
    router: AppRouterInstance,
    songRef: RefObject<HTMLAudioElement | null>,
    uiStateChangers: UIStateChangers
) => {

    uiStateChangers.setLoadingMessage("Logando...");
    uiStateChangers.setIsLoading(true);
    const loginResult = await tryLogin(data.email, data.password);
    uiStateChangers.setIsLoading(false);

    await handleLoginResult(loginResult, router, songRef, uiStateChangers);
}

const handleLoginResult = async (
    loginResult: LoginOrRegisterResult,
    router: AppRouterInstance,
    songRef: RefObject<HTMLAudioElement | null>,
    uiStateChangers: UIStateChangers
) => {
    switch (loginResult.status) {
        case "success":
            router.push("/songs");
            if (songRef.current) {
                songRef.current.pause();
                songRef.current = null;
                uiStateChangers.setIsPlaying(false);
            }
            break;
        case "unverified":
            uiStateChangers.setMessage("Email não verificado. Um novo link de verificação foi enviado. Verifique a caixa de spam.");
            uiStateChangers.setIsShow(true);
            await logoutFromFirebase();
            break;
        case "error":
            errorHandling(loginResult.code, uiStateChangers);
            break;
    }
}

const errorHandling = (
    errorCode: string,
    uiStateChangers: UIStateChangers
) => {

    switch (errorCode) {
        case "auth/invalid-credential":
            uiStateChangers.setMessage("Email ou(e) senha inválido(s).");
            break;
        case "auth/too-many-requests":
            uiStateChangers.setMessage("Muitas requisições em pouco tempo. Tente novamente mais tarde.");
            break;
        default:
            uiStateChangers.setMessage("Erro desconhecido. Tente novamente mais tarde");
            break;
    }
    uiStateChangers.setIsShow(true);
}