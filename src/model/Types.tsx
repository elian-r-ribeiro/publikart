type LoginOrRegisterResult =
    | { status: "success" }
    | { status: "unverified" }
    | { status: "invalidProfilePictureFile" }
    | { status: "error"; code: string };

type SongUploadResult =
    | { status: "success" }
    | { status: "invalidSongImageFile" }
    | { status: "invalidSongFile" }
    | { status: "error"; code: string };

type PlaylistUploadOrUpdateResult =
    | { status: "success" }
    | { status: "invalidPlaylistImageFile" }
    | { status: "error"; code: string }

type ValidateFileTypeResult =
    | { status: "invalidFile" }
    | { status: "validFile" }

type ProfileUpdateResult =
    | { status: "success" }
    | { status: "invalidProfilePictureFile" }
    | { status: "error"; code: string }

export type {
    LoginOrRegisterResult,
    SongUploadResult,
    ValidateFileTypeResult,
    ProfileUpdateResult,
    PlaylistUploadOrUpdateResult
}