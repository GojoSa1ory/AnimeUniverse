import './form.scss'
import React from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'



type IForm = {
    isLoginPage: boolean
    username: string
    email?: string
    password: string
    setUsername(username:string):void 
    setPassword(password: string):void
    setEmail?(email:string): void
    onClick(e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined): void
}

function Form(props: IForm) {

    return (
        <>
            <form className='form-container'>

                <h1 className='form-title'>{props.isLoginPage && 'Login'}</h1>

                <Input
                 value={props.username} 
                 setValue={props.setUsername} 
                 type='text' 
                 placeholder='Username' 
                 className='form-input' />

                {!props.isLoginPage && 
                    <Input 
                        value={props.email} 
                        setValue={props.setEmail!} 
                        type='text' 
                        placeholder='example@gmail.com' 
                        className='form-input' 
                    />
                }

                <Input 
                    value={props.password} 
                    setValue={props.setPassword} 
                    type='password' 
                    placeholder='******' 
                    className='form-input' 
                />


                {props.isLoginPage
                    ? <p>
                        You don't have an account? 
                        <Link className='form-link' to={'/register'}>Register</Link>
                      </p>
                    : <p>
                        Do u have an account? 
                        <Link className='form-link' to={'/login'}>Login</Link>
                      </p>
                }

                <Button
                    onClick={e => props.onClick(e)}
                    className='form-button'>
                    <p>{props.isLoginPage ? 'Login' : 'Register'}</p>
                </Button>

            </form>
        </>

    )
}

export default Form