type LoginOrRegisterResult =
    | { status: "success" }
    | { status: "unverified" }
    | { status: "error"; code: string };

type SongUploadResult =
    | { status: "success" }
    | { status: "invalidSongImageFile" }
    | { status: "invalidSongFile" }
    | { status: "error"; code: string };

type ValidateFileTypeResult =
    | { status: "invalidFile" }
    | { status: "validFile" }

export type {
    LoginOrRegisterResult,
    SongUploadResult,
    ValidateFileTypeResult
}