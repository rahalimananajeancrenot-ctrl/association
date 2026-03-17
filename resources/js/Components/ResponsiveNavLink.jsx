import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center py-2 px-3 rounded-lg transition-colors duration-150 ease-in-out 
                ${active 
                    ? 'bg-primary text-primary-content'  // DaisyUI gère la couleur active
                    : 'bg-base-100 text-base-content hover:bg-base-200 hover:text-base-content dark:bg-base-200 dark:text-base-content dark:hover:bg-base-300'
                } ${className}`}
        >
            {children}
        </Link>
    );
}