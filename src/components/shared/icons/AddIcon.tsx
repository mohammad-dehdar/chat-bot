import React from 'react';

interface AddIconProps {
    className?: string;
    width?: number | string;
    height?: number | string;
    fill?: string;
}

export const AddIcon: React.FC<AddIconProps> = ({
    className,
    width = 24,
    height = 24,
    fill,
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z"
                fill={fill || 'currentColor'}
            />
        </svg>
    );
};
