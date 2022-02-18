import * as React from "react";
import {IButtonProps} from "./IButtonProps";

export class Button extends React.Component<IButtonProps> {
    public render() {
        const { className, value, onMouseDown } = this.props;
        return (
            <button className={className} onMouseDown={onMouseDown}>{value}</button>
        );
    }
}