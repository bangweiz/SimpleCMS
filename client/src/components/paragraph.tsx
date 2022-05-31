/** @jsxImportSource @emotion/react */

export const Paragraph = (props: ParagraphProps) => {
    return (
        <p css={{
            margin: props.margin || "0 1rem",
            display: "inline-block",
            fontSize: props.fontSize,
            lineHeight: props.lineHeight,
            fontWeight: props.fontWeight,
            width: props.width,
            textAlign: props.textAlign || "center"
        }}>
            {props.content}
        </p>
    )
}


interface ParagraphProps {
    content: string,
    fontFamily?: string,
    fontSize?: string,
    fontWeight?: string,
    color?: string,
    lineHeight?: string,
    margin?: string,
    width?: string,
    textAlign?: "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
}