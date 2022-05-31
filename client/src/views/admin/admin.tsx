import React from "react";
import styled from "@emotion/styled";
import {useAuth} from "../../utils/auth";
import {fontStyle} from "../../conf/style";
import {Sidebar} from "./sidebar";
import {Outlet} from "react-router";
import {Paragraph} from "../../components/paragraph";
import {Button, Dropdown, Menu} from "antd";

export const Admin = () => {
    const {user, logout} = useAuth()
    return (
        <Container>
            <Sidebar />
            <Main>
                <Header>
                    <div>
                        <Paragraph
                            content="Welcome"
                            lineHeight="3.9rem"
                            fontSize="2rem"
                            fontWeight="600"
                        />
                    </div>
                    <div>
                        <Dropdown overlay={<Menu>
                            <Menu.Item key="logout">
                                <Button type="link" onClick={logout}>
                                    Log Out
                                </Button>
                            </Menu.Item>
                        </Menu>}>
                            <Button type="link">
                                <Paragraph
                                    content={`Hello, ${user?.username}`}
                                    lineHeight="3.9rem"
                                    fontSize="1.6rem"
                                />
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Main>
        </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-areas: "sidebar main";
  background-color: #f4f3ef;
`

const Header = styled.div`
  padding: 1rem 3rem;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  font-family: ${fontStyle.fontFamily};
`

const Main = styled.div`
  grid-area: main;
`

const Content = styled.div`
    padding: 1.5rem 2rem;
`