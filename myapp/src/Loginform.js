import React, { useState } from 'react'

const Loginform = () => {
    const [islogin, setlogin] = useState(true);
    return (
        <div className='container'>
            <div className='form-container'  >
                <div className='form-toggle'>
                    <button className={islogin ? 'active' : ""} onClick={() => { setlogin(true) }}>Login</button>
                    <button className={!islogin ? 'active' : ""} onClick={() => { setlogin(false) }}>Signup</button>
                </div>

                {islogin ? <>
                    <div className='form'>
                        <h2>Login Form</h2>
                        <input type='' placeholder='name'></input>
                        <input type='' placeholder='password'></input>
                        <button>Login</button>
                    </div></> : <> <div>
                        <div className='form'>
                       <h2>Sign Form</h2>
                        <input type='' placeholder='name'></input>
                        <input type='' placeholder='password'></input>
                         <input type='' placeholder='conformpassword'></input>
                        <button>Signup</button></div> </div></>}
            </div>
        </div>

    )
}

export default Loginform