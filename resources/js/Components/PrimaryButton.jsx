export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `btn btn-primary btn-sm transition-all duration-150 ease-in-out
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ` + className
            }
        >
            {children}
        </button>
    );
}