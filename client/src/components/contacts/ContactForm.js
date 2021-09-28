import React, { useContext, useState, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext=useContext(ContactContext);
    const {addContact, current, clearCurrent, updateContact}=contactContext;

    useEffect(()=>{
        if(current!==null){
            setContact(current);
        }
        else{
            setContact({
                name: '',
                videoId: '',
                category: '',
                type: 'personal'
            });
        }
    },[contactContext,current]);
    const [contact, setContact] = useState({
        name: '',
        videoId: '',
        category: '',
        type: 'personal'
    });

    const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }
        else{
            updateContact(contact);
        }
        clearAll();
    }
    const { name, videoId, type, category } = contact;

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange}></input>
            <input type="text" placeholder="videoId" name="videoId" value={videoId} onChange={onChange}></input>
            <input type="text" placeholder="category" name="category" value={category} onChange={onChange}></input>
           
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && <div>
                <button className="btn btn-white btn-block" onClick={clearAll}>Clear
                </button>
                </div>}
        </form>
    )
}

export default ContactForm
