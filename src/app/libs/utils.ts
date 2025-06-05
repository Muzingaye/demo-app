import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object" && value !== null) {
    return JSON.parse(JSON.stringify(value));
  }
  return String(value);
};

export const getFileType = (filename: string) => {
  // const parts = filename.split(".");
  // const extension = parts.length > 1 ? parts.pop() : "";
  // const type = extension ? extension.toLowerCase() : "";
  // return { type, extension };

  const parts = filename.split(".");

  if (parts.length < 2) {
    return { type: "", extension: "" };
  }

  const extension = parts.pop()?.toLowerCase() || "";
  return { type: extension, extension };
};

export const getFileIcon = (extension: string, type: string) => {
  const ext = extension.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "svg":
      return "🖼️"; // image icon
    case "pdf":
      return "📄"; // pdf icon
    case "doc":
    case "docx":
      return "📝"; // word icon
    case "xls":
    case "xlsx":
      return "📊"; // excel icon
    case "ppt":
    case "pptx":
      return "📈"; // powerpoint icon
    case "zip":
    case "rar":
    case "7z":
      return "🗜️"; // archive icon
    case "mp3":
    case "wav":
      return "🎵"; // audio icon
    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
      return "🎬"; // video icon
    case "txt":
      return "📃"; // text icon
    case "json":
    case "js":
    case "ts":
    case "tsx":
    case "css":
    case "html":
      return "💻"; // code icon
    default:
      if (type.startsWith("image/")) return "🖼️";
      if (type.startsWith("video/")) return "🎬";
      if (type.startsWith("audio/")) return "🎵";
      if (type.startsWith("application/pdf")) return "📄";
      return "📁"; // generic file icon
  }
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
