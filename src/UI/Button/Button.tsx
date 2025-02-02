import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'outline',
}

const Button = ({
                    children, variant = 'filled', className, ...props
}: ButtonProps): React.JSX.Element => {
    const defaultButtonClassName = "border rounded flex py-1 px-2 text-base leading-normal-keyword"
    let ButtonClassName;

    switch (variant) {
        case 'filled':
            ButtonClassName = "border-bl1 bg-bl1"
            break;
        case 'outline':
            ButtonClassName = "border-bl1 bg-white-bg"
            break;
        default:
            ButtonClassName = "border-bl1 bg-bl1"
            break;
    }

    return (
        <button className={[defaultButtonClassName, ButtonClassName, className].join(' ')} {...props}>
            {children}
        </button>
    );
};

export default Button;