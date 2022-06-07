import React, { useEffect, useState, useRef } from 'react';

/**
 * @param props
 * @returns {JSX.Element}
 */
const ProgressBar = (props: {
    size: number;
    progress: number;
    done?: boolean;
    success?: boolean;
    strokeWidth: number;
    fontSize?: number;
    progressColor: string;
    bgColor: string;
    fontColor?: string;
    onClickReload?: (event: any) => void;
}): JSX.Element => {
    const [offset, setOffset] = useState(0);
    const circleRef = useRef(null);
    const { size, progress, done, success, strokeWidth, fontSize, bgColor, progressColor, fontColor, onClickReload } = props;

    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);

        circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out';
    }, [setOffset, progress, circumference, offset]);

    return (
        <>
            <svg
                className={progress >= 100 && !done ? 'spinner' : ''}
                style={{
                    display: 'block',
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: '100%',
                    fill: 'transparent',
                }}
                width={size}
                height={size}
            >
                <circle style={{ fill: 'none' }} stroke={bgColor} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                <circle
                    style={{ fill: 'none' }}
                    ref={circleRef}
                    stroke={progressColor}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                {/* Progress Percentage */}
                {progress < 100 && success && (
                    <text
                        x={center}
                        y={center + radius / 4}
                        style={{
                            fontSize: fontSize || 12,
                            textAnchor: 'middle',
                            fill: fontColor || '#fff',
                        }}
                    >
                        {progress}%
                    </text>
                )}
                {/* Progress Spinner */}
                {progress >= 100 && !done &&
                    <circle className="path" stroke='black' cx={center} cy={center} r={radius} strokeWidth={strokeWidth - 2}></circle>
                }
                {/* Completed checkmark */}
                {progress >= 100 && success && done && (
                    <text
                        x={center}
                        y={center + radius / 3}
                        style={{
                            fontSize: 18,
                            fontWeight: 'bolder',
                            textAnchor: 'middle',
                            fill: 'seagreen',
                        }}
                    >
                        &#10003;
                    </text>
                )}
                {/* Failed cross */}
                {progress >= 100 && !success && done && !onClickReload && (
                    <text
                        x={center}
                        y={center + radius / 3}
                        style={{
                            fontSize: 16,
                            fontWeight: 'bolder',
                            textAnchor: 'middle',
                            fill: 'red',
                        }}
                    >
                        &#10006;
                    </text>
                )}
                {/* Failed reload */}
                {progress >= 100 && !success && done && onClickReload && (
                    <text
                        x={center}
                        y={center + radius / 2.2}
                        style={{
                            fontSize: 24,
                            textAnchor: 'middle',
                            fill: 'red',
                            cursor: onClickReload ? 'pointer' : 'auto',
                        }}
                        onClick={onClickReload}
                    >
                        &#10227;
                    </text>
                )}
            </svg> 
        </>
    );
};

export default ProgressBar;
