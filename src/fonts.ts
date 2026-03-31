import { Outfit, Libre_Caslon_Display } from "next/font/google";

export const outfit = Outfit({ 
    subsets: ["latin"], 
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-outfit"
});

export const caslon = Libre_Caslon_Display({ 
    subsets: ["latin"], 
    weight: ["400"],
    variable: "--font-caslon"
});
