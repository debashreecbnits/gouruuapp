import { SET_APP_CONFIG } from "../ActionTypes";
const initialState = {
  appConfig: [
    {
      countryStates: ["Badakhshan", "Badghis", "Baghlan", "Balkh", "Bamian"],
      countryCode: "AF",
      countryUnicode: "U+1F1E6 U+1F1EB",
      country: "Afghanistan",
      countryEmoji: "🇦🇫",
    },
  ],
};

export default function adminDetails(state = initialState, action) {
  switch (action.type) {
    case SET_APP_CONFIG:
      return { ...state, appConfig: action.payload };

    default:
      return state;
  }
}

export const dummy_service_list = [
  {
    service_name: "First Service",
    description: "new description added again",
    category: "test category",
    price: 1005,
    image: "http://111.93.169.90:8470/media/slide2.jpg",
    type: "Miscellaneous",
  },
  {
    service_name: "second Service",
    description: "send service descripton",
    category: "test category",
    price: 1085,
    image: "http://111.93.169.90:8470/media/testimonial3.jpg",
    type: "Miscellaneous",
  },
  {
    service_name: "third Service",
    description: "third service descripton",
    category: "test category",
    price: 10850,
    image: "http://111.93.169.90:8470/media/testimonial2.jpg",
    type: "Miscellaneous",
  },
  {
    service_name: "Website UI/UX",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    category: "Software Development",
    price: 999,
    image: "http://111.93.169.90:8470/media/pslide5.jpg",
    type: "Professional",
  },
  {
    service_name: "App Development",
    description: "Development Descrription",
    category: "Data Analytics",
    price: 999,
    image: "http://111.93.169.90:8470/media/main-slide1.jpg",
    type: "Professional",
  },
  {
    service_name: "Designing",
    description: "Designing Web Pages",
    category: "Software Development",
    price: 876,
    image: "http://111.93.169.90:8470/media/banner.jpg",
    type: "Professional",
  },
  {
    service_name: "Designing 1",
    description: "Designing Web Pages 1",
    category: "Software Development",
    price: 654,
    image: "http://111.93.169.90:8470/media/news1.jpg",
    type: "Professional",
  },
  {
    service_name: "Prototyping",
    description: "Prototyping Web Pages ",
    category: "Software Development",
    price: 654,
    image: "http://111.93.169.90:8470/media/slide4.jpg",
    type: "Professional",
  },
  {
    service_name: "Prototyping 1",
    description: "Prototyping Web Pages 1",
    category: "Data Analytics",
    price: 44,
    image: "http://111.93.169.90:8470/media/slide1.jpg",
    type: "Professional",
  },
  {
    service_name: "design 21",
    description: "design 21",
    category: "test category",
    price: 367,
    image: "http://111.93.169.90:8470/media/pslide6.jpg",
    type: "Miscellaneous",
  },
  {
    service_name: "Plumbing",
    description: "Plumbing",
    category: "test category",
    price: 23,
    image: "http://111.93.169.90:8470/media/slide7.jpg",
    type: "Miscellaneous",
  },
  {
    service_name: "plumbing 231",
    description: "plumbing 231",
    category: "test category",
    price: 34,
    image: "http://111.93.169.90:8470/media/slide8.jpg",
    type: "Miscellaneous",
  },
  {
    service_name: "xyz",
    description: "xyz",
    category: "test category",
    price: 345,
    image: null,
    type: "Miscellaneous",
  },
  {
    service_name: "My services",
    description: "My first services",
    category: "Data Analytics",
    price: 123,
    image: null,
    type: "Professional",
  },
  {
    service_name: "demo",
    description: "demo",
    category: "Data Analytics",
    price: 232,
    image: null,
    type: "Professional",
  },
];
