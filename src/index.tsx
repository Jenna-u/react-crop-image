import React, { useState, useCallback, useRef } from 'react'
import { Modal} from 'antd'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import 'antd/dist/antd.css'

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
function getCroppedImg(image: HTMLCanvasElement | HTMLImageElement | SVGImageElement | HTMLVideoElement | ImageBitmap | OffscreenCanvas | null, crop: { width: number; height: number; x: number; y: number } | null, fileName: any) {
  const pixelRatio = window.devicePixelRatio || 1
  const canvas = document.createElement('canvas')

  const ctx = canvas.getContext('2d')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width * pixelRatio
  canvas.height = crop.height * pixelRatio

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = 'high'

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  )

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      blob.name = fileName
      resolve(blob)
    }, 'image/jpeg', 1)
  })
}

export default function ReactCropImage(props) {
  const imgRef = useRef(null)
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 200,
  })
  const [completedCrop, setCompletedCrop] = useState(null)

  const onLoad = useCallback(img => {
    imgRef.current = img
  }, [])

  const handleOk = () => {
    const image = imgRef.current
    getCroppedImg(image, completedCrop, props.file.name).then(blob => {
      let newFile = new File([blob], props.file.name, { type: props.file.type })
      props.onOk(newFile)
    })
  }

  const handleCancel = () => {
    props.onCancel()
  }

  return (
    <>
      {props.src
        &&
        <Modal
          {...props.modalProps}
          destroyOnClose
          visible={true}
          title={props.title || 'Edit image'}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ReactCrop
            {...props.cropProps}
            src={props.src}
            crop={crop}
            onChange={(c => setCrop(c)}
            onImageLoaded={onLoad}
            onComplete={(c: React.SetStateAction<null>) => setCompletedCrop(c)}
          />
        </Modal>
      }
      { props.children }
    </>
  )
}
