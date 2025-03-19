'use client'
import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { getTableLink } from "@/lib/utils";

export default function QRCodeTable ({token, tableNumber, width = 250}: {
    token: string
    tableNumber: number
    width?: number
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    useEffect(() => {
        const canvas = canvasRef.current
        QRCode.toCanvas(canvas, getTableLink({
              token,
              tableNumber
            }), function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }, [tableNumber, token])
    return (
        <canvas 
            ref={canvasRef} 
        />
    )
}