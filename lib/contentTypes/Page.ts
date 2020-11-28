import { Image, RichText } from "./generic";

export interface Page {
  slug: string;
  photo: Image;
  content: RichText;
  subtitle: string;
  title: string;
}
