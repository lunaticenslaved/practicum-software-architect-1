export type UseCaseValidationResult<TInput> = {
    type: 'success',
    input: TInput
} | {
    type: 'error',
    error: Error
}

export interface IUseCase<TInput, TOutput> {
    execute(input: TInput): Promise<TOutput>
    validate(data: unknown): Promise<{
        type: 'success',
        input: TInput
    } | {
        type: 'error',
        error: Error
    }>;
}