import { categoryType } from "./category";
import { caseStudiesPageType } from "./caseStudiesPage";
import { inMediaPageType } from "./inMediaPage";
import {
  desktopScreenshotType,
  pageScreenshotsType,
  responsiveScreenshotType,
} from "./pageScreenshots";
import { postType } from "./post";
import { tagType } from "./tag";

export const schemaTypes = [
  postType,
  caseStudiesPageType,
  inMediaPageType,
  categoryType,
  tagType,
  responsiveScreenshotType,
  desktopScreenshotType,
  pageScreenshotsType,
];
