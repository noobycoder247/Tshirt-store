import React from 'react'

const ImageHelper = ({ product }) => {
    const imageurl = product ? product.image : "/notfound.png"
    return (
        <div className="rounded border border-success p-2" id="div-flex">
            <img src={imageurl}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                className="mb-3 rounded"
                alt="not found"
            />
        </div>
    )
}

export default ImageHelper