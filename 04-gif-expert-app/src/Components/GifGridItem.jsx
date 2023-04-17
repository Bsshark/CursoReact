import React from 'react'

export const GifGridItem = ({title, url}) => {
    return (
        <div className="card">
            <img src={url} alt={title}></img>
            <p>{title}</p>
        </div>
    )
}
