import { useLiveQuery } from "dexie-react-hooks"
import { db } from '../dexie'
import getPhotoUrl from 'get-photo-url'
import Animation from "./animation"
const Gallery = () => {


    const uploadImage = async () => {
        await db.gallery.add({
            url: await getPhotoUrl('#addPhotoInput')
        })
    }

    const allPhotos = useLiveQuery( () => db.gallery.reverse().toArray(), [])

    const removePhoto = async (id) => {
        await db.gallery.delete(id)
    }

    const galleryImages = (
        <section className="gallery">
            {allPhotos?.map( (photo) => ( 
                <div className="item">
                    <img src={photo.url} key = {photo.id} className='item-image' alt="" />
                    <button onClick={ () => removePhoto(photo.id)} className="delete-button">Delete</button>
                </div>
            ))}
        </section>
    )

    const noImage = <p className="noPhoto">No Image</p>

    return (
        <>
            <input type="file" accept="image/*" name="photo" id="addPhotoInput" />
            <label htmlFor="addPhotoInput" onClick={uploadImage}>
                <i className="add-photo-button bi bi-arrow-up-square-fill"></i>
            </label>

            {allPhotos ? allPhotos?.length > 0 ? galleryImages : noImage : <Animation/>}
        </>
    )
}


export default Gallery