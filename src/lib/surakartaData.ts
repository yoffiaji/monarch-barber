import { LocationPageData } from "@/types";

const surakartaData: LocationPageData = {
  metaTitle: "Monarch Barber Surakarta — Best Haircut in Surakarta",
  metaDescription:
    "Monarch Barber Surakarta — Premium barbershop experience in the heart of Solo. Book your haircut, beard trim or shave today.",

  cityName: "SURAKARTA",
  heroImage: "/images/surakarta/hero-surakarta.jpg",

  aboutTitle: "ABOUT MONARCH SURAKARTA",
  aboutParagraphs: [
  "Monarch Surakarta berlokasi di kawasan Laweyan, Surakarta — sebuah area dinamis yang merepresentasikan perpaduan antara warisan budaya dan gaya hidup modern.",
  "Berdiri sejak tahun 1998, Monarch Surakarta telah berkembang menjadi destinasi grooming premium yang mengedepankan presisi, kenyamanan, dan kualitas dalam setiap layanan.",
  "Kami menghadirkan rangkaian layanan grooming pria yang dirancang secara profesional — dimulai dari konsultasi personal, proses pengerjaan yang detail, hair wash, hot towel, hingga finishing yang rapi dan presisi — menciptakan pengalaman grooming yang eksklusif dan berkelas.",
],

  teamBgColor: "#9EB3BC",

  barbers: [
    {
      name: "Evelyn",
      image: "/images/barbers/barber1.jpg",
      bookingUrl: "/user/surakarta#book",
    },
    {
      name: "Joel",
      image: "/images/barbers/barber2.webp",
      bookingUrl: "/user/surakarta#book",
    },
    {
      name: "Lloyd",
      image: "/images/barbers/barber3.jpg",
      bookingUrl: "/user/surakarta#book",
    },
    {
      name: "Sammy",
      image: "/images/barbers/barber4.png",
      bookingUrl: "/user/surakarta#book",
    },
  ],

  priceTabs: [
    {
      id: "services",
      label: "SERVICES",
      services: [
        {
          name: "Haircut",
          description: "Konsultasi, potong, dan styling sesuai karakter Anda.",
          price: 100000,
          currency: "Rp",
        },
        {
          name: "Beard Trim",
          description: "Perapian jenggot presisi dengan gunting dan clipper.",
          price: 60000,
          currency: "Rp",
        },
        {
          name: "Hot Towel Shave",
          description: "Cukur bersih dengan pisau cukur dan handuk panas.",
          price: 85000,
          currency: "Rp",
        },
        {
          name: "Hair Coloring",
          description: "Pewarnaan rambut dengan produk berkualitas tinggi.",
          price: 250000,
          currency: "Rp",
        },
        {
          name: "Hair Braiding",
          description: "Anyaman rambut rapi untuk tampilan yang bold dan unik.",
          price: 350000,
          currency: "Rp",
        },
        {
          name: "Wash and Style",
          description: "Keramas dan styling tanpa potong untuk tampilan instan.",
          price: 40000,
          currency: "Rp",
        },
      ],
    },
    {
      id: "packages",
      label: "PACKAGES",
      services: [
        {
          name: "The Essential",
          description: "Haircut + Wash & Style. Tampilan bersih untuk kebutuhan sehari-hari.",
          price: 130000,
          currency: "Rp",
        },
        {
          name: "The Gentleman",
          description: "Haircut + Beard Trim. Kombinasi klasik untuk tampilan maskulin dan rapi.",
          price: 150000,
          currency: "Rp",
        },
        {
          name: "The Classic Shave",
          description: "Beard Trim + Hot Towel Shave. Pengalaman cukur tradisional yang sesungguhnya.",
          price: 130000,
          currency: "Rp",
        },
        {
          name: "The Executive",
          description: "Haircut + Beard Trim + Hot Towel Shave. Satu sesi, tampilan sempurna.",
          price: 220000,
          currency: "Rp",
        },
        {
          name: "The Monarch",
          description: "Haircut + Beard Trim + Hot Towel Shave + Scalp Treatment. Pengalaman grooming terlengkap.",
          price: 320000,
          currency: "Rp",
        },
      ],
    },
    {
      id: "treatments",
      label: "TREATMENTS",
      services: [
        {
          name: "Scalp Treatment",
          description: "Detoks dan nutrisi mendalam untuk kulit kepala sehat.",
          price: 120000,
          currency: "Rp",
        },
        {
          name: "Hair Perming",
          description: "Keriting permanen untuk tekstur dan volume natural.",
          price: 150000,
          currency: "Rp",
        },
        {
          name: "Hair Straightening",
          description: "Pelurusan permanen untuk rambut halus dan mudah diatur.",
          price: 200000,
          currency: "Rp",
        },
        {
          name: "Hair Mask",
          description: "Masker intensif untuk rambut lebih kuat, lembut, dan berkilau.",
          price: 100000,
          currency: "Rp",
        },
        {
          name: "Dandruff Treatment",
          description: "Perawatan targeted untuk mengatasi ketombe dan iritasi kulit kepala.",
          price: 130000,
          currency: "Rp",
        },
        {
          name: "Head Massage",
          description: "Pijat kepala relaksasi untuk meredakan ketegangan dan melancarkan sirkulasi.",
          price: 80000,
          currency: "Rp",
        },
      ],
    },
    {
      id: "products",
      label: "PRODUCTS",
      services: [
        {
          name: "Pomade / Clay",
          description: "Hold kuat, tersedia matte dan glossy.",
          price: 85000,
          currency: "Rp",
        },
        {
          name: "Hair Tonic",
          description: "Nutrisi kulit kepala, segar tanpa lepek.",
          price: 60000,
          currency: "Rp",
        },
        {
          name: "Shampoo & Conditioner",
          description: "Bersih dan lembut untuk penggunaan rutin.",
          price: 70000,
          currency: "Rp",
        },
        {
          name: "Beard Oil",
          description: "Jenggot lebih lembut dengan aroma maskulin.",
          price: 75000,
          currency: "Rp",
        },
      ],
    },
  ],

  priceImage: "/images/yogyakarta/price.jpg",
  bookingLocation: "Laweyan — Monarch Surakarta",
  galleryImages: [
    "/images/surakarta/1.jpg",
    "/images/surakarta/2.jpg",
    "/images/surakarta/3.jpg",
  ],
};

export default surakartaData;