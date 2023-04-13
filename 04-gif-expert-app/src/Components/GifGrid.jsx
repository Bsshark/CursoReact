import { useState, useEffect } from "react";
import { getGifs } from "../helpers/getGifs";

export const GifGrid = ({ category }) => {

    const [images, setImages] = useState([]);

    const getImages = async() => {

        setImages(await getGifs(category));
    }

    useEffect( () =>{
        getImages();
    }, [] );

    
    return (
        <>
            <h3>{category}</h3>

            <ol>
                {
                    images.map( ({id, title, url}) => (
                        <li key={id}>
                            {title}
                        </li>
                    ))
                }
            </ol>
        </>
    )
}
