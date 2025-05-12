import { entryBgBaseURL } from "../api/api";

const imgs = [
  "/bedroom.jpg",
  "/cyberpunk.jpg",
  "/dock.jpg",
  "/giand_bridge.jpg",
  "/gorgeous01.jpg",
  "/mountain&forest.jpg",
  "/room.jpg",
  "/scene.jpg",
  "/street.jpg",
  "/sunset.jpg",
  "/train.jpg",
];

export function getRandomImg() {
  return entryBgBaseURL + imgs[Math.floor(Math.random() * imgs.length)];
}
