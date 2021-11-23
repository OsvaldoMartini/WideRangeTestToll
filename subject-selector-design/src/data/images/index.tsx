export type CountryISO =
  | "BE"
  | "DE"
  | "FR"
  | "IT"
  | "NL"
  | "RU"
  | "US"
  | "nhsPlus"
  | "nhsLogo";

type placeImg = "place0" | "place1" | "place2";

type image = "logo" | "demoAvatar" | CountryISO | placeImg;

// Development images
const devImages: Record<image, string> = {
  logo: require("./logo.png"),

  demoAvatar: require("./OMartini.png"),
  nhsPlus: require("./nhsplus.svg"),
  nhsLogo: require("./nhslogo.svg"),
  
  
  BE: require("./be.svg"),
  DE: require("./de.svg"),
  FR: require("./fr.svg"),
  IT: require("./it.svg"),
  NL: require("./nl.svg"),
  RU: require("./ru.svg"),
  US: require("./us.svg"),

  place0: require("./place0.png"),
  place1: require("./place1.png"),
  place2: require("./place2.png"),
};

//Production images (CDN)
const prodImages: Record<image, string> = {
  logo: "https://res.cloudinary.com/tailwindcss/image/upload/v1634916081/Logo_Icon_dq276z.png",
  demoAvatar:
    "https://res.cloudinary.com/tailwindcss/image/upload/v1634915122/demoAvatar_jooj6y.png",
  nhsPlus: require("./nhsplus.svg"),
  nhsLogo: require("./nhslogo.svg"),
  
  BE: "https://res.cloudinary.com/tailwindcss/image/upload/v1635279280/be_jrkj6d.svg",
  DE: "https://res.cloudinary.com/tailwindcss/image/upload/v1635279281/de_umqzrw.svg",
  FR: "https://res.cloudinary.com/tailwindcss/image/upload/v1635279284/fr_kfnvdu.svg",
  IT: "https://res.cloudinary.com/tailwindcss/image/upload/v1635279276/it_dwah46.svg",
  NL: "https://res.cloudinary.com/tailwindcss/image/upload/v1635279277/nl_tpy2ab.svg",
  RU: "https://res.cloudinary.com/tailwindcss/image/upload/v1635279278/ru_dcbkqy.svg",
  US: "https://res.cloudinary.com/tailwindcss/image/upload/v1635279279/us_bid855.svg",
 

  place0:
    "https://res.cloudinary.com/tailwindcss/image/upload/v1634674297/image_1_egxeww.png",
  place1:
    "https://res.cloudinary.com/tailwindcss/image/upload/v1634674298/image_2_ngqift.png",
  place2:
    "https://res.cloudinary.com/tailwindcss/image/upload/v1634674297/image_3_c7xiit.png",
};

// export const images = devImages;
export const images =
  process.env.NODE_ENV === "production" ? prodImages : devImages;
