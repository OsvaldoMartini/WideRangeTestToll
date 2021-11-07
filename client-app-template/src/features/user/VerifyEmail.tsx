import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import agent from '../../app/api/agent';
import queryString from 'query-string';
import LoginForm from './LoginForm';


const VerifyEmail: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    
    const Status = {
        Verifying: 'Verifying',
        Failed: 'Failed',
        Success: 'Success'
    }
    const [status, setStatus] = useState(Status.Verifying);
    const {openModal} = rootStore.modalStore;
    const {token, email}= queryString.parse(location.search);

    function handleConfirmEmailResend() {
        agent.User.resendEmailConfirm(email as string).then(() => {
            toast.success('Verification email resent - please check your email');
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        agent.User.verifyEmail(token as string, email as string).then(() => {
            setStatus(Status.Success)
        }).catch(() => {
            setStatus(Status.Failed)
        })
    }, [Status.Failed, Status.Success, token, email])

    function getBody() {
        switch (status) {
            case Status.Verifying:
                return <p>Verifying...</p>;
            case Status.Failed:
                return (
                    <div className='center'>
                        <p>Verification failed.  You can try resending the verify link to your email</p>
                        <Button 
                        primary 
                        onClick={handleConfirmEmailResend} 
                        size='huge' 
                        content='Resend email' />
                    </div>
                );
            case Status.Success:
                return (
                    <div className='center'>
                        <p>Email has been verified - you can now login</p>
                        <Button 
                        primary 
                        onClick={() => openModal(<LoginForm />)} 
                        size='large' 
                        content='Login'
                        />
                    </div>
                );
        }
    }

    return (
        <Segment placeholder textAlign='center'>
            <Header icon>
                <Icon name='envelope' />
                Email verification
            </Header>
            <Segment.Inline>
                {getBody()}
            </Segment.Inline>
        </Segment>
    )
};

export default VerifyEmail;