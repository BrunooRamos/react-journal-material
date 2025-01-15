

export const refactorErrorAuthMessages = ( errorMessage: string ) => {
    switch (errorMessage) {
        case 'auth/invalid-credential':
            return 'Invalid credentials';
        case 'auth/invalid-password':
            return 'Invalid password';
        case 'auth/invalid-email':
            return 'Invalid email';
        default:
            return "An error occurred, please try again later";
    }
}