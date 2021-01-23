export interface IForm {
    title: string,
    rows: {
        label: string,
        inputType: string,
        name: string,
        placeHolder: string,
    }[],
    onChange: (event: React.FormEvent<HTMLInputElement>) => void,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    message: string | null,
    buttonText: string
}