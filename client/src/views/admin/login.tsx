import React from "react";
import {Alert, Button, Form, Input} from "antd";
import {useAuth} from "../../utils/auth";
import styled from "@emotion/styled";
import {HeadText} from "../../components/head-text";

export const Login = () => {
    const { login, error } = useAuth()

    return (
        <Container>
            <FormContainer>
                <div style={{marginBottom: '1.5rem'}}>
                    <HeadText content="ADMIN LOGIN" />
                </div>
                {error && error.hasOwnProperty('msg') && <Alert style={{marginBottom: '1.5rem', textAlign: 'center'}} message={error.msg} type="error"/>}
                <Form
                    autoComplete="off"
                    labelCol={{ span: 4 }}
                    onFinish={login}
                    layout="vertical"
                >
                    <Form.Item
                        label="Email:"
                        name="email"
                        validateStatus={error && error.hasOwnProperty('email') ? 'error' : undefined}
                        help={error && error.hasOwnProperty('email') ? error.email : undefined}
                        rules={[
                            {required: true, message: 'Please input year email'}
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password:"
                        name="password"
                        validateStatus={error && error.hasOwnProperty('password') ? 'error' : undefined}
                        help={error && error.hasOwnProperty('password') ? error.password : undefined}
                        rules={[
                            {required: true, message: 'Please input your password'}
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{width: '100%'}} type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </FormContainer>
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

const FormContainer = styled.div`
  width: 50rem;
`