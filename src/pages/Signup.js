import React,{useState} from 'react'
import '../styles/users.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
const serverUrl = process.env.REACT_APP_SERVER_URL
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [username,setUsername] = useState('');

const handleSignup = (e) => {
    e.preventDefault();

    axios.post(`${serverUrl}/users/signup`,{email,password,username})
    .then(res=>{
        if(res.data.status===409){
            alert('There is another user with this email. Try another one')
        } else{
            setEmail('')
            setPassword('')
            setUsername('')
        }
    })
    .catch(err=>console.log(err))
}

    return(
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSignup}>
                <div className='title-container'>
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='email'>Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' name='email' placeholder='Enter Email' required/>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='password'>Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' name='password' placeholder='Enter Password' required/>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='username'>Username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type='text' name='username' placeholder='Enter Username' required/>
                </div>
                <div className='button-container'>
                    <button type='reset' className='cancelbtn'>Cancel</button>
                    <button type='submit' className='signupbtn'>Sign Up</button>
                </div>
                <p className='signin-message'>Already have an account? <Link to='/signin'>Sign In</Link></p>
            </form>
        </div>
    )
}

export default Signup