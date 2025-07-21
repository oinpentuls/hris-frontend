export type ProblemJson = {
    type: string,
    title: string,
    status: number,
    errors: Record<string, string[]>
}