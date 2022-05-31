import React, {useEffect, useState} from "react";
import * as bladeService from "../../../services/blade"
import {BladeType, Blade} from "../../../types/blade";
import {HeadText} from "../../head-text";
import {Paragraph} from "../../paragraph";
import {Link} from "react-router-dom";
import {Button} from "antd";
import styled from "@emotion/styled";

export const Content = (props: ContentProps) => {
    const {bladeId} = props
    const [blade, setBlade] = useState<Partial<Blade> | null>(null)

    useEffect(() => {
        bladeService.getBlade(bladeId, BladeType.CONTENT).then(res => {
            if (res && res.data) {
                setBlade(res.data)
            }
        })
    }, [bladeId])


    return (
        blade?.content ?
        (
            <ContentContainer>
                <div style={{marginBottom: '1rem'}}>
                    <HeadText content={blade.content.title || ''} />
                    {
                        blade.content?.subtitle &&
                        <HeadText content={blade.content.subtitle} />
                    }
                </div>
                <div>
                    <Paragraph
                        content={blade?.content.content || ''}
                        textAlign="center"
                        fontSize="1.6rem"
                        lineHeight="2.2rem"
                    />
                    {
                        blade?.content?.buttonLink &&
                        blade.content.buttonText &&
                        (
                            <div style={{textAlign: 'center', marginTop: '2rem'}}>
                                <Link to={blade.content.buttonLink} >
                                    <Button type="primary">
                                        {blade.content.buttonText}
                                    </Button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </ContentContainer>
        ) :
        (
            <div/>
        )
    )
}

interface ContentProps {
    bladeId: number
}

const ContentContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto 3rem auto;
`
