import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';

interface Props {
  onHide: () => void;
  onShow: () => void;
  show: boolean;
  link: string;
}

const ModalUploadImg = (props: Props) => {
  const { onHide, onShow, show, link } = props;
  const previewCanvasRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  useEffect(() => {}, []);

  const handleSave = () => {};

  const onImageLoaded = useCallback((image: any) => {
    imageRef.current = image;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imageRef.current) {
      return;
    }

    const image = imageRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);

  return (
    <Modal onHide={onHide} show={show} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <ReactCrop
            src={link ? link : ''}
            crop={crop}
            onChange={(newCrop: any) => {
              setCrop(newCrop);
            }}
            onImageLoaded={onImageLoaded}
            onComplete={(c) => setCompletedCrop(c)}
          />
        </div>
        <div>
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={'primary'} onClick={onHide}>
          Close
        </Button>
        <Button onClick={handleSave}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUploadImg;
