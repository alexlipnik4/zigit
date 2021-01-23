
export interface ILoginProps {
    userData: LoginInfo,
    message: string | null,
    onSubmit: () => void,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
    loading: boolean,
}

export type LoginInfo = {
    email: string,
    password: string,
}