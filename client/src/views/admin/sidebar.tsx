import React from "react";
import styled from "@emotion/styled";
import {fontStyle} from "../../conf/style";
import {Menu} from "antd";
import {useAuth} from "../../utils/auth";
import { Avatar } from 'antd';
import defaultAvatar from "../../assets/img/default_avatar.png";
import {Paragraph} from "../../components/paragraph";
import {Link} from "react-router-dom";
import {sidebarConfig} from "../../conf/sidebar";

export const Sidebar = () => {
    const {user} = useAuth()

    return (
        <SideBar>
            <Profile>
                <div>
                    <Avatar src={defaultAvatar} />
                    <Paragraph
                        content={user?.username || 'Admin User'}
                        lineHeight="3.2rem"
                        fontWeight="500"
                        fontSize="1.6rem"
                    />
                </div>
            </Profile>
            <Menu
                mode={sidebarConfig.mode}
                defaultSelectedKeys={sidebarConfig.defaultSelectedKeys}
            >
                {sidebarConfig.items.map(item => (
                    <Menu.Item key={item.key}>
                        <Link to={item.to}>
                            {item.label}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </SideBar>
    )
}

const SideBar = styled.div`
  grid-area: sidebar;
  min-height: 100vh;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  font-family: ${fontStyle.fontFamily};
`

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
  height: 5rem;
  border-bottom: 1px solid #ddd;
`