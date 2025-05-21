export interface Status {
    value: number;
    text: string;
}

export const options =([
    { value: 1, text: '未着手' },
    { value: 2, text: '進行中' },
    { value: 3, text: '完了' }
]);