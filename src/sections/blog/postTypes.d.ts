export interface PostOption {
    value: string,
    label: string
}

export interface PostSortProps {
    options: Array<PostOption>,
    onSort?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}