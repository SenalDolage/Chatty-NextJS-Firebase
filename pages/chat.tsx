import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Notiflix from "notiflix";
import { db } from '../services/firebase'
import styles from '../styles/Chat.module.css'

export default function Chat(): JSX.Element {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm();
    const { TextArea } = Input;

    type ChatData = {
        content?: string
        timestamp?: string
        uid?: string
    }

    const onFinish = async (values: any) => {
        try {
            await db.ref('chats/').push({
                content: values.message,
                timestamp: new Date().toLocaleString(),
                uid: 'JWANJCY4437WRWHQQ135'
            })
            Notiflix.Notify.success('Message Sent!');
            form.resetFields()
        } catch (error) {
            Notiflix.Notify.failure('Error sending message');
            console.error(error)
        } finally {}
    };

    useEffect(() => {
        const getChatData = async () => {
            try {
                await db.ref('chats/').on('value', snapshot => {
                    let chatsArr: ChatData[] = []
                    snapshot.forEach((snap) => {
                        chatsArr.push(snap.val())
                    })
                    setChats(chatsArr)
                })
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }

        getChatData();
    }, [])

    return (
        <div className="outter-wrap">
            <div className="box-container">
                
                {loading ?
                    <LoadingOutlined />
                    : (
                        <div className={styles.chat_wrap}>
                            {chats.map((chatItem) => (
                                <div key={chatItem.timestamp} className={styles.chat_bubble}>
                                    <h5 className={styles.chat_message}>{chatItem.content}</h5>
                                    <p className={styles.chat_timestamp}>{chatItem.timestamp}</p>
                                </div>
                            ))}
                        </div>
                    )
                }
                
                <Form form={form} name="horizontal_login" onFinish={onFinish} className={styles.message_form}>
                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: 'Please enter a message!' }]}
                    >
                        <TextArea showCount maxLength={100} placeholder="Enter message" />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                                style={{float: 'right'}}
                            >
                                Send
                            </Button>
                        )}
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}