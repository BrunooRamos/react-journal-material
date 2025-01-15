export interface RegisterUserProps {
    email: string;
    password: string;
    displayName: string;
}

export interface LoginUserProps {
    email: string;
    password: string;
}



export interface ErrorResponse {
    ok: boolean;
    errorMessage: string;
    errorCode: string;
}