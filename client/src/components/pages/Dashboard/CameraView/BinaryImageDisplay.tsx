import { useEffect, useState } from "react";
import jpeg from "jpeg-js";
import Image from "next/image";
export const BinaryImageDisplay = ({ binaryString }: { binaryString: string }) => {
  const [imageUrl, setImageUrl] = useState<Nullable<string>>(null);

  useEffect(() => {
    try {
      const decodedStr = binaryString
        ?.slice(2, -1)
        .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\r/g, '\r')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');

      const byteArray = Uint8Array.from(decodedStr, c => c.charCodeAt(0));

      const decoded = jpeg.decode(byteArray);

      const canvas = document.createElement('canvas');
      canvas.width = decoded.width;
      canvas.height = decoded.height;

      const ctx = canvas.getContext('2d');
      const imageData = new ImageData(new Uint8ClampedArray(decoded.data), decoded.width, decoded.height);

      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      ctx.putImageData(imageData, 0, 0);

      // Create a data URL from the canvas
      const url = canvas.toDataURL();

      setImageUrl(url);
    } catch (error) {
      console.error("Error decoding image:", error);
    }


  }, [binaryString]);

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Camera"
          className="w-full"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};
