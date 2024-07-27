import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

    const ref = useRef()
    const PasswordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setPasswordsArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordsArray(JSON.parse(passwords));
        }
    }, [])

    const eyeClosed = () => {
        if (ref.current.src.includes("icons/eyeClosed.png")) {
            ref.current.src = "icons/eyeOpen.png"
            PasswordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyeClosed.png"
            PasswordRef.current.type = "text"
        }
    }

    const savePassword = (e) => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]))
            console.log([...passwordsArray, form]);
            setForm({ site: "", username: "", password: "" })
            toast('Saved Successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
        else{
            toast('Error:Password Not Saved!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const deleteFunc = (id) => {
        let checking = confirm("Is you really want to delete the Password");
        if (checking) {
            setPasswordsArray(passwordsArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordsArray.filter(item => item.id !== id)))
            toast('Entry Deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

    const editFunc = (id) => {
        setForm(passwordsArray.filter(item => item.id === id)[0])
        setPasswordsArray(passwordsArray.filter(item => item.id !== id))
    }

    const copy = (copyText) => {
        toast('Copied!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(copyText);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className='flexcontainer'>
                <div className='px-44 flex flex-col text-black h-[85vh] bg-green-50 '>
                    {/* Starts main section Code */}
                    <div className='text-center font-bold text-xl cursor-pointer mt-4'>
                        <span className='text-green-500'>&lt;</span>
                        <span>Pswd</span>
                        <span className='text-green-500'>NU/&gt;</span>
                    </div>
                    <p className='text-center my-2'>Your Own Password Manager</p>

                    {/* Inputs Tags place for writting web links */}
                    <div className='flex items-center justify-center '>
                        <input className='w-[70vw] rounded-xl border border-green-600 py-[3px] pl-2 text-sm' type="text" placeholder='Enter Website URl' value={form.site} onChange={handleChange} name="site" id="" />
                    </div>

                    {/* Inputs Tags place for Name and Password*/}
                    <div className='flex items-center justify-between my-4 mx-auto w-[500px] '>
                        <div>
                            <input className='lg:rounded-xl lg:border lg:border-green-600 lg:py-[3px] lg:w-[200px] lg:pl-2 lg:text-sm ' placeholder='Enter Username' type="text" value={form.username} name='username' onChange={handleChange} />
                        </div>
                        <div className='flex justify-between relative'>
                            <input ref={PasswordRef} className='rounded-xl border border-green-600 py-[3px] w-[200px] pl-2 text-sm ' placeholder='Enter Password' type="password" value={form.password} name='password' onChange={handleChange} />
                            <span className='absolute right-1'>
                                <img ref={ref} className='p-1 cursor-pointer' onClick={eyeClosed} width={28} src="/icons/eyeOpen.png" alt="EyeOpen" />
                            </span>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div className='mx-auto'>
                        <button className='bg-green-400 flex items-center py-1 px-3 mt-2 rounded-xl gap-x-1 hover:bg-green-300' onClick={savePassword}>
                            <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/plus-key.png" alt="plus-key" />
                            <div>Save Password</div>
                        </button>
                    </div>

                    {/* Data table of passwords */}
                    <div className='passwords'>
                        <div className='font-bold cursor-pointer text-lg mt-4 mb-2'>Your Passwords</div>
                        {passwordsArray.length === 0 && <div>No Passowrds to shown</div>}
                        {passwordsArray.length != 0 && <div className="">
                            <section class="mx-auto container ">
                                <div className='bg-green-800 text-white rounded-lg'>
                                    <div className='flex justify-start items-center'>
                                        <div className='w-[500px] text-center py-2 font-semibold text-lg cursor-pointer'>Site</div>
                                        <div className='w-[150px] text-center py-2 font-semibold text-lg cursor-pointer'>Username</div>
                                        <div className='w-[150px] text-center py-2 font-semibold text-lg cursor-pointer'>Password</div>
                                        <div className='w-[50px] text-center py-2 font-semibold text-lg cursor-pointer'>Actions</div>
                                    </div>
                                </div>
                                <div className='bg-green-50 h-[160px] scroll-container-y container'>
                                    {passwordsArray.map((item, key) => {
                                        return (
                                            <div key={key} className='flex'>
                                                <div className='p-2 border border-white w-[500px] scroll-container-x flex justify-center items-center'>
                                                    <div>
                                                        <a href={item.site} target='_blank'>{item.site}</a>
                                                    </div>
                                                    <div>
                                                        <img onClick={() => { copy(item.site) }} className='w-5 h-5 cursor-pointer' src="icons/Copy.png" alt="Copy.png" />
                                                    </div>
                                                </div>
                                                <div className='py-2 border border-white w-[150px] flex justify-center items-center'>
                                                    <div>{item.username}</div>
                                                    <div>
                                                        <img onClick={() => { copy(item.username) }} className='w-5 h-5 cursor-pointer' src="icons/Copy.png" alt="Copy.png" />
                                                    </div>
                                                </div>
                                                <div className='py-2 border border-white w-[150px] flex justify-center items-center'>
                                                    <div>{"*".repeat(item.password.length)}</div>
                                                    <img onClick={() => { copy(item.password) }} className='w-5 h-5 cursor-pointer' src="icons/Copy.png" alt="Copy.png" />
                                                    
                                                </div>
                                                <div className='py-2 border border-white w-[50px] flex justify-center items-center'>
                                                    <img onClick={() => { editFunc(item.id) }} className='w-5 h-5 cursor-pointer' src="icons/edit.png" alt="edit.png" />
                                                    <img onClick={() => { deleteFunc(item.id) }} className='w-5 h-5 cursor-pointer' src="icons/Delete.png" alt="Delete.png" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
