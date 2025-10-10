type LoginOrRegisterResult =
    | { status: "success" }
    | { status: "unverified" }
    | { status: "invalidProfilePictureFile" }
    | { status: "error"; code: string };

type SongUploadResult =
    | { status: "success" }
    | { status: "invalidSongImageFile" }
    | { status: "invalidSongFile" }
    | { status: "notASupporter" }
    | { status: "error"; code: string };

type PlaylistUploadOrUpdateResult =
    | { status: "success" }
    | { status: "invalidPlaylistImageFile" }
    | { status: "notASupporter" }
    | { status: "error"; code: string }

type ValidateFileTypeResult =
    | { status: "invalidFile" }
    | { status: "validFile" }
    | { status: "gif" }

type ProfileUpdateResult =
    | { status: "success" }
    | { status: "invalidProfilePictureFile" }
    | { status: "notASupporter" }
    | { status: "error"; code: string }

export type {
    LoginOrRegisterResult,
    SongUploadResult,
    ValidateFileTypeResult,
    ProfileUpdateResult,
    PlaylistUploadOrUpdateResult
}