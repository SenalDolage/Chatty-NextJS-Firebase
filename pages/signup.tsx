import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Notiflix from "notiflix";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signUp, signInWithGoogle } from '../helpers/auth';

export default function SignUp(): JSX.Element {
    const router = useRouter();

    const onFinish = async (values: any) => {
         await signUp(values.email, values.password);
      
    };

    const googleSignUp = async () => {
        try {
            const result = await signInWithGoogle()
            if(result.additionalUserInfo?.isNewUser) {
                router.push('/chat')
                Notiflix.Notify.success('Sign Up is successful!');
            } else {
                router.push('/login')
                Notiflix.Notify.info('Account already exists! Please use the login');
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="outter-wrap">
            <div className="box-container">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <input type="hidden" value="something" />
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please enter a valid email!', type: 'email' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Link href="/login">Already have an account?</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="dashed" onClick={googleSignUp}>Sign up with Google</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}