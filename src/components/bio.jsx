import { useState } from 'react'
import getPhotoUrl from 'get-photo-url'
import defaultProfilePic from '../assets/profileIcon.svg'
import { db } from '../dexie'
import { useLiveQuery } from 'dexie-react-hooks'

const Bio = () => {


    const [formIsOpen, setFormIsOpen] = useState(false) 

    const updateUserDetails = async (e) => {
        e.preventDefault()
        const userUpdatedDetails = {
            name: e.target.nameOfUser.value, //document.querySelector('#username').value,
            about: e.target.aboutUser.value
        }
        await db.bio.put(userUpdatedDetails, 'userinfo')
        setFormIsOpen(false)
    }

    const updateProfilePicture = async () => {
        const newProfilePic = await getPhotoUrl('#profilePhotoInput')
        await db.bio.put(newProfilePic, 'profilephoto')
    }

    const userDetails = useLiveQuery( () => db.bio.get('userinfo'), [])

    const userProfilePicture = useLiveQuery( () => db.bio.get('profilephoto'), [])




    // DYNAMIC ELEMENTS
    const editForm = (
        <form className='edit-bio-form' onSubmit={ (e) => updateUserDetails(e)}>
            <input type="text" name='nameOfUser' id='username' defaultValue={userDetails?.name} placeholder='Your name'/>
            <input type="text" name='aboutUser' id='aboutuser' defaultValue={userDetails?.about} placeholder='About you'/>
            <br />
            <button type='button'  onClick={ () => setFormIsOpen(false)} className='cancel-button'>Cancel</button>
            <button type='submit' className='save-button'>Save</button>
        </form>
    )

    const editButton = <button onClick={ () => setFormIsOpen(true)}>Edit</button>

    return (
        <section className="bio">
            <input type="file" accept='image/*' id="profilePhotoInput" />
            <label title='click to edit' htmlFor="profilePhotoInput" onClick={updateProfilePicture}>
                <div className="profile-photo" role="button" title="Click to edit photo">
                    <img src={userProfilePicture? userProfilePicture: defaultProfilePic} alt="profile" />
                </div>
            </label>

            <div className="profile-info">
                {/* <p className="name">{userDetails ? userDetails.name : "This user doesn't have a name"}</p>
                <p className="about">{userDetails ? userDetails.about : "We know nothing about this user"}</p>  */}
                <p className="name">{userDetails?.name || "This user doesn't have a name"}</p>
                <p className="name">{userDetails?.about || "We know nothing about this user"}</p>
                {formIsOpen ? editForm: editButton}
            </div>
        </section>
    )
}

export default Bio