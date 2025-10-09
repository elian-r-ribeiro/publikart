import { ValidateFileTypeResult } from "@/model/Types";

const validateFileType = (file: File, fileType: string): ValidateFileTypeResult => {

    if (fileType === "image") {
        if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg") {
            return { status: "invalidFile" };
        } else {
            return { status: "validFile" };
        }
    } else if (file.type !== fileType) {
        return { status: "invalidFile" };
    } else {
        return { status: "validFile" };
    }
}

export {
    validateFileType
}