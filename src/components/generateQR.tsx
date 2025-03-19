'use client'
import { getTableLink } from '@/lib/utils'
import QRCode from 'qrcode'
import { useEffect, useRef } from 'react'

const QRCodeTable = ({
  token,
  tableNumber,
  width = 250
}: {
  token: string
  tableNumber: number
  width?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const qrCanvas = document.createElement('canvas')
    // const canvas = canvasRef.current!
    const canvas = canvasRef.current!
    canvas.height = width + 70
    canvas.width = width
    // const qrContext = qrCanvas.getContext('2d')!
    const canvasContext = canvas.getContext('2d')!
    canvasContext.fillStyle = '#fff'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    canvasContext.font = '20px Arial'
    canvasContext.textAlign = 'center'
    canvasContext.fillStyle = '#000'
    canvasContext.fillText(`Bàn số ${tableNumber}`, width / 2, width + 20)
    canvasContext.fillText('Quét mã QR để gọi món', width / 2, width + 50)
    QRCode.toCanvas(
      qrCanvas,
      getTableLink({
        token,
        tableNumber
      }),
      {
        width,
        margin: 4
      },
      function (error) {
        if (error) console.error(error)
        canvasContext.drawImage(qrCanvas, 0, 0, width, width)
      }
    )
  }, [token, tableNumber, width])
  return <canvas ref={canvasRef} />
}

export default QRCodeTable