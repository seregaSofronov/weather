export interface IButtonProps {
    className: string;
    href?: string;
    value?: any;

    onMouseDown?(): void;
}