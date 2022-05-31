import React from "react";
import styled from "@emotion/styled";
import {Paragraph} from "../../../components/paragraph";

export const Footer = (props: FooterProps) => {
    return (
        <MyFooter>
            <div>
                <Paragraph content={props.footerText} fontSize="1.6rem" fontWeight="600" />
            </div>
        </MyFooter>
    )
}

interface FooterProps {
    footerText: string
}

const MyFooter = styled.footer`
  height: 10rem;
  width: 100%;
  padding: 3rem;
  background-color: rgb(58, 71, 83);
  color: #FFFFFF;
`