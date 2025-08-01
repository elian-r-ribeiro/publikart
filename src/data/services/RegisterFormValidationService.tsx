import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

const handleRegister = async (email: string, password: string, confirmPassword: string): Promise<void> => {

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        alert("Usuário criado: " + user);
    } catch (error) {
        console.log("Erro ao registrar: " + error);
    }

}

export { handleRegister };