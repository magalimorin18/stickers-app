export interface StickerPack {
  id: string;
  packName: string;
  creatorName: string;
  stickers: { imageUrl: string; emoji: string[] }[]; // Array of sticker images and emojis
  android_play_store_link?: string; // Optional
  ios_app_store_link?: string; // Optional
}
