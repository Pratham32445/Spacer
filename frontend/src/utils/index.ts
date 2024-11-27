export const extractYoutubeId = (url: string) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
};

export const getThumbnail = (url: string) => {
  const video_id = extractYoutubeId(url);
  return video_id ? `https://img.youtube.com/vi/${video_id}/0.jpg` : "";
};

export const durationToMinute = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds =
    duration - minutes * 60 < 0
      ? duration - minutes * 60 * -1
      : duration - minutes * 60;
  return `${minutes}:${seconds}`;
};
