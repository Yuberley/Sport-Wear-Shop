export const PlusIcon = ({size = 24, ...props}) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size}
            role="presentation"
            viewBox="0 0 24 24"
            width={size}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};