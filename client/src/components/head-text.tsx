import React from "react";

export const HeadText = (props: HeadTextProps) => {
    const {content, textAlign, margin} = props
    return (
        <h1
            style={{
                margin: margin || '0',
                textAlign: textAlign || 'center'
            }}
        >
            {content}
        </h1>
    )
}

interface HeadTextProps {
    content: string,
    textAlign?: "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start",
    margin?: string
}