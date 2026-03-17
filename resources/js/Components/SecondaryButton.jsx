export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`btn btn-outline btn-sm transition-colors duration-150 ease-in-out
                ${disabled ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}
                ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}