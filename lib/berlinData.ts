import { Barber, PriceTab } from "@/types";

export const yogyakartaBarbers: Barber[] = [
  {
    name: "Evelyn",
    image:
      "https://www.nomadbarber.com/cdn/shop/files/Evelyn_-_Berlin.webp?v=1705384066",
    bookingUrl: "https://nomadkreuzberg.resurva.com",
  },
  {
    name: "Joel",
    image: "https://www.nomadbarber.com/cdn/shop/files/9.jpg?v=1751113157",
    bookingUrl: "https://nomadkreuzberg.resurva.com",
  },
  {
    name: "Lloyd",
    image:
      "https://www.nomadbarber.com/cdn/shop/files/Untitled_design_1.jpg?v=1751113468",
    bookingUrl: "https://nomadkreuzberg.resurva.com",
  },
  {
    name: "Sammy",
    image:
      "https://www.nomadbarber.com/cdn/shop/files/Untitled_design_16.png?v=1769111244",
    bookingUrl: "https://nomadkreuzberg.resurva.com/",
  },
];

export const yogyakartaPriceTabs: PriceTab[] = [
  {
    id: "services",
    label: "SERVICES",
    services: [
      {
        name: "Haircut",
        description:
          "A consultation, wash & haircut from your requested barber. Styled and finished with your recommended product.",
        price: 50,
        currency: "€",
      },
      {
        name: "Back and Sides",
        description:
          "For this service we will cut the back and sides of your hair for those in between haircuts...",
        price: 35,
        currency: "€",
      },
      {
        name: "Buzz Cut",
        description:
          "A Haircut using only clippers and cut down to precision. (note - Just clippers, no scissor work.)",
        price: 35,
        currency: "€",
      },
      {
        name: "Beard Trim",
        description:
          "An expert beard trim and using clippers and scissors to trim the beard back down to normal.",
        price: 35,
        currency: "€",
      },
      {
        name: "Wash and style",
        description:
          "Not ready for a haircut but want to have your hair looking slick for an event...",
        price: 20,
        currency: "€",
      },
      {
        name: "Nomad Shave",
        description:
          "Nomad Shave - A hot towel shave using techniques from the British Barbershop...",
        price: 50,
        currency: "€",
      },
    ],
  },
  {
    id: "packages",
    label: "PACKAGES",
    services: [
      {
        name: "Haircut + Beard Trim",
        description:
          "Consultation and haircut from your requested barber. Styled and finished with your recommended product...",
        price: 74,
        currency: "€",
      },
      {
        name: "Buzz Cut or Back & Sides + Beard Trim",
        description:
          "A Haircut using only clippers and cut down to precision. (note - Just clippers, no scissor work...",
        price: 60,
        currency: "€",
      },
      {
        name: "Beard trim + Shave",
        description:
          "An expert beard trim and using clippers and scissors to trim the beard back down to normal...",
        price: 50,
        currency: "€",
      },
      {
        name: "Haircut + Beard Trim + Shave",
        description:
          "Consultation and haircut from your requested barber. Styled and finished with your recommended product...",
        price: 87,
        currency: "€",
      },
      {
        name: "Buzz Cut/Back & Sides + Beard Trim + Shave",
        description: "",
        price: 74,
        currency: "€",
      },
      {
        name: "Haircut + Shave",
        description:
          "Consultation and haircut from your requested barber. Styled and finished with your...",
        price: 87,
        currency: "€",
      },
    ],
  },
];

export const yogyakartaGalleryImages = [
  "https://www.nomadbarber.com/cdn/shop/files/Untitled_910_x_1260_px_1.jpg?v=1751111925",
  "https://www.nomadbarber.com/cdn/shop/files/1.jpg?v=1751111956",
  "https://www.nomadbarber.com/cdn/shop/files/2.jpg?v=1751111975",
];