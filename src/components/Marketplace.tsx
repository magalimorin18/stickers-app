import { CSSProperties, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BASE_URL } from "../globals";

interface StickerPack {
  id: string;
  packName: string;
  creatorName: string;
  stickers: { imageUrl: string; emoji: string[] }[]; // Array of sticker images and emojis
  android_play_store_link?: string; // Optional
  ios_app_store_link?: string; // Optional
}

function Marketplace() {
  const stickerPacks: StickerPack[] = [
    {
      id: "1",
      packName: "Personal Stickers",
      creatorName: "Magali",
      stickers: [
        { imageUrl: "./images/mag-1.webp", emoji: ["😀"] },
        { imageUrl: "./images/mag-2.jpeg", emoji: ["😀"] },
        {
          imageUrl:
            "https://api.universalprofile.cloud/ipfs/QmPNNJCM67pHeWFQsJuavHfWEzWTM1Ws28Po43v1tx58Kf",
          emoji: ["😂"],
        },
      ],
    },
    {
      id: "2",
      packName: "Funny Faces",
      creatorName: "StickerMaster",
      stickers: [
        { imageUrl: "./images/ff-1.png", emoji: ["😀"] },
        { imageUrl: "./images/ff-2.png", emoji: ["😀"] },
        { imageUrl: "./images/ff-3.png", emoji: ["😀"] },
      ],
    },
  ];

  const [isExporting, setIsExporting] = useState(false); // Loading State

  const createWastickersFile = async (pack: StickerPack): Promise<Blob> => {
    const zip = new JSZip();
    const metadata = {
      android_play_store_link: pack.android_play_store_link || "",
      ios_app_store_link: pack.ios_app_store_link || "",
      emojis: pack.stickers.flatMap((s) => s.emoji), // Flatten emojis array
      image_data_version: 1,
      avoid_cache: true,
      sticker_pack_id: pack.id,
      sticker_pack_name: pack.packName,
      sticker_pack_publisher: pack.creatorName,
      stickers: pack.stickers.map((sticker, index) => ({
        image_file: `sticker${index + 1}.webp`,
        emojis: sticker.emoji,
      })),
    };

    zip.file("metadata.json", JSON.stringify(metadata));

    // Download images, convert to WebP using the backend, and add to ZIP
    await Promise.all(
      pack.stickers.map(async (sticker, index) => {
        try {
          const webpURL = `${BASE_URL}/process-image?url=${encodeURIComponent(
            sticker.imageUrl,
          )}`;

          const response = await fetch(webpURL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const webpBlob = await response.blob();
          zip.file(`sticker${index + 1}.webp`, webpBlob);
        } catch (error) {
          console.error(`❌Error processing sticker ${index + 1}:`, error);
        }
      }),
    );

    return zip.generateAsync({ type: "blob" });
  };

  const handleExportToWhatsApp = async (pack: StickerPack) => {
    console.log("handleExportToWhatsApp called for pack:", pack.packName); // VERY FIRST LINE
    setIsExporting(true); // Set loading state to true
    try {
      console.log("Creating wastickersFile...");
      const wastickersBlob = await createWastickersFile(pack);
      console.log("wastickersBlob created successfully");
      const wastickersFile = new File(
        [wastickersBlob],
        `${pack.packName}.wastickers`,
        { type: "application/zip" },
      );

      // Debugging information
      console.log("File Object:", wastickersFile);
      console.log("File Type:", wastickersFile.type);
      console.log("File Size:", wastickersFile.size);

      console.log("navigator.share not supported, using saveAs");
      saveAs(wastickersBlob, `${pack.packName}.zip`); // Trigger download
      console.log("Downloaded .wastickers file");
    } catch (error) {
      console.error("Error exporting sticker pack:", error);
      alert("Failed to export sticker pack. See console for details.");
    } finally {
      setIsExporting(false); // Set loading state to false after completion or error
      console.log("handleExportToWhatsApp completed (success or failure)"); // LAST LINE IN FUNCTION
    }
  };

  return (
    <div style={marketplaceContainerStyle}>
      <h2>Marketplace de Sticker Packs</h2>
      <div style={stickerPackListStyle}>
        {stickerPacks.map((pack) => (
          <div key={pack.id} style={stickerPackCardStyle}>
            <h3>{pack.packName}</h3>
            <p>Creator: {pack.creatorName}</p>
            <div style={stickerPreviewStyle}>
              {pack.stickers.map((sticker, index) => (
                <img
                  key={index}
                  src={sticker.imageUrl}
                  alt={`Sticker ${index + 1}`}
                  style={stickerImageStyle}
                />
              ))}
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={() => handleExportToWhatsApp(pack)}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export to WhatsApp"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles
const marketplaceContainerStyle: CSSProperties = {
  padding: "20px",
  marginTop: "60px",
};

const stickerPackListStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const stickerPackCardStyle: CSSProperties = {
  width: "250px",
  margin: "10px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  textAlign: "center",
};

const stickerPreviewStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px",
};

const stickerImageStyle: CSSProperties = {
  width: "50px",
  height: "50px",
  margin: "5px",
};

export default Marketplace;
