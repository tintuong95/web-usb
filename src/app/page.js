"use client"

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from 'react'

export default function Home() {
  const getPrints = async () => {
    try {
      let usbDevice;
      const filters = [];
      usbDevice = await navigator.usb.requestDevice({ filters });
      await usbDevice.open();
      await usbDevice.selectConfiguration(1); // Select the first configuration
      await usbDevice.claimInterface(0); // Claim the first interface

      const textToPrint = "Nội dung cần in";
      const encoder = new TextEncoder();
      const endpoint = usbDevice.configuration.interfaces[0].alternate.endpoints[0];

      await usbDevice.transferOut(endpoint.endpointNumber, encoder.encode(textToPrint));
      console.log('Đã gửi yêu cầu in.');

    } catch (error) {
      console.error(`Lỗi khi kết nối đến máy in: ${error}`);
    }
  }
  return (
    <>
      <button id="connectButton" onClick={getPrints}>Kết nối đến máy in USB</button>
      <button id="printButton" disabled>In ấn</button></>
  )
}
