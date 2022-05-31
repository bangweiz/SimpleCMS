import React from "react";
import {Link} from "react-router-dom";
import {Paragraph} from "../../../components/paragraph";
import styled from "@emotion/styled";
import {HeadText} from "../../../components/head-text";

export const Header = (props: HeaderProps) => {
    return (
        <MyHeader>
            <div>
                <Link to="/">
                    <HeadText content={props.title} />
                </Link>
            </div>
            <LinkList>
                <LinkItem>
                    <Paragraph content="Home" />
                </LinkItem>
                <LinkItem>
                    <Paragraph content="About" />
                </LinkItem>
                <LinkItem>
                    <Paragraph content="Contact" />
                </LinkItem>
                <LinkItem>
                    <Paragraph content="Detail" />
                </LinkItem>
                <LinkItem>
                    <Paragraph content="Service" />
                </LinkItem>
            </LinkList>
        </MyHeader>
    )
}

interface HeaderProps {
    title: string
}

const MyHeader = styled.header`
  height: 8.2rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
`

const LinkList = styled.ul`
  width: 80%;
  display: flex;
  justify-content: space-around;
  list-style: none;
  font-size: 1.6rem;
  line-height: 5.2rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0;
`

const LinkItem = styled.li`
  :hover {
    color: rgba(14, 162, 189, 0.843);
  }
`