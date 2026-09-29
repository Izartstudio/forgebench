import { categoryType } from "./category";
import {
  pageScreenshotsType,
  responsiveScreenshotType,
} from "./pageScreenshots";
import { postType } from "./post";
import { tagType } from "./tag";

export const schemaTypes = [
  postType,
  categoryType,
  tagType,
  responsiveScreenshotType,
  pageScreenshotsType,
];
