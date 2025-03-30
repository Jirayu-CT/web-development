export type actionFuncion = (
    prevState: any,
    formData: FormData
) => Promise<{ message: string }>